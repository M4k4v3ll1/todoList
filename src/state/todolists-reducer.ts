import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type TodoListsReducerActionsTypes =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType |
    SetTodoListsActionType
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id: id} as const
}
export const addTodoListAC = (todoList: TodoListType, title: string) => {
    return {type: 'ADD-TODOLIST', todoList, title} as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {type: 'SET-TODOLISTS', todoLists} as const
}

export const todoListID1 = v1()
export const todoListID2 = v1()

const initialState: TodoListDomainType[] = []


export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: TodoListsReducerActionsTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {...action.todoList, filter: 'all', title: action.title}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case 'SET-TODOLISTS': {
            return action.todoLists.map(el => ({...el, filter: 'all'}))
        }
        default:
            return state
    }
}

export const getTodoListsTC = () => (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}

export const deleteTodoListTC = (todoListID: string) => (dispatch: Dispatch) => {
    todoListsAPI.deleteTodoList(todoListID)
        .then(res => {
            dispatch(removeTodoListAC(todoListID))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todoListsAPI.createTodoList(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item, title))
        })
}

export const changeTodoListTitleTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    todoListsAPI.updateTodoList(todoListID, title)
        .then(res => {
            dispatch(changeTodoListTitleAC(todoListID, title))
        })
}