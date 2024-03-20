import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";

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

// initial state
const initialState: TodoListDomainType[] = []

// reducer
export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: TodoListsReducerActionTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {...action.todoList, filter: 'all', title: action.title}]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)

        case 'SET-TODOLISTS':
            return action.todoLists.map(el => ({...el, filter: 'all'}))

        default:
            return state
    }
}

// thunks
export const getTodoListsTC = () =>
    (dispatch: Dispatch<TodoListsReducerActionTypes>) => {
        todoListsAPI.getTodoLists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
            })
    }
export const deleteTodoListTC = (todoListID: string) =>
    (dispatch: Dispatch<TodoListsReducerActionTypes>) => {
        todoListsAPI.deleteTodoList(todoListID)
            .then(res => {
                dispatch(removeTodoListAC(todoListID))
            })
    }
export const addTodoListTC = (title: string) =>
    (dispatch: Dispatch<TodoListsReducerActionTypes>) => {
        todoListsAPI.createTodoList(title)
            .then(res => {
                dispatch(addTodoListAC(res.data.data.item, title))
            })
    }
export const changeTodoListTitleTC = (todoListID: string, title: string) =>
    (dispatch: Dispatch<TodoListsReducerActionTypes>) => {
        todoListsAPI.updateTodoList(todoListID, title)
            .then(res => {
                dispatch(changeTodoListTitleAC(todoListID, title))
            })
    }

// types
export type TodoListsReducerActionTypes =
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    ReturnType<typeof setTodoListsAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}