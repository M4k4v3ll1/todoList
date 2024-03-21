import {v1} from "uuid";
import {RESULT_CODE, todoListsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppReducerActionTypes, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

// constants
export const todoListID1 = v1()
export const todoListID2 = v1()

// actions
export const removeTodoListAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodoListAC = (todoList: TodoListType, title: string) =>
    ({type: 'ADD-TODOLIST', todoList, title} as const)
export const changeTodoListTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) =>
    ({type: 'SET-TODOLISTS', todoLists} as const)
export const setTodoListEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)

// initial state
const initialState: TodoListDomainType[] = []

// reducer
export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: TodoListsReducerActionTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {...action.todoList, filter: 'all', title: action.title, entityStatus: "idle"}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
        case 'SET-TODOLISTS':
            return action.todoLists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))
        default:
            return state
    }
}

// thunks
export const fetchTodoListsTC = () =>
    (dispatch: ThunkDispatchTypes) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.getTodoLists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
export const addTodoListTC = (title: string) =>
    (dispatch: ThunkDispatchTypes) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.createTodoList(title)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(addTodoListAC(res.data.data.item, title))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
            }})
            .catch(err => {
                handleServerNetworkError(err, dispatch)
        })
    }
export const deleteTodoListTC = (todoListID: string) =>
    (dispatch: ThunkDispatchTypes) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodoListEntityStatusAC(todoListID, "loading"))
        todoListsAPI.deleteTodoList(todoListID)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(removeTodoListAC(todoListID))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const changeTodoListTitleTC = (todoListID: string, title: string) =>
    (dispatch: ThunkDispatchTypes) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.updateTodoList(todoListID, title)
            .then(res => {
                dispatch(changeTodoListTitleAC(todoListID, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
    }

// types
export type TodoListsReducerActionTypes =
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    ReturnType<typeof setTodoListsAC> |
    ReturnType<typeof setTodoListEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type ThunkDispatchTypes = Dispatch<TodoListsReducerActionTypes | AppReducerActionTypes>