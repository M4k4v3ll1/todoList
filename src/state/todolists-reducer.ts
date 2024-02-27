import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
type TodoListsReducerActionsTypes =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
export const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id: id} as const
}
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', todoListID: v1(), title: title} as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}

export const todoListID1 = v1()
export const todoListID2 = v1()

const initialState: TodoListsType[] = [
    // {id: todoListID1, title: 'What to learn', filter: 'all'},
    // {id: todoListID2, title: 'What to buy', filter: 'all'},
]

export const todoListsReducer = (state: TodoListsType[] = initialState, action: TodoListsReducerActionsTypes): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todoListID,
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        default:
            return state
    }
}