import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsTypes =
    RemoveTaskActionType |
    AddTaskActionType |
    changeTaskStatusActionType |
    changeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}
export const addTaskAC = (todolistID:  string, taskTitle: string) => {
    return {type: 'ADD-TASK', todolistID, taskTitle} as const
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistID, taskID, status} as const
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, taskTitle} as const
}

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {todoListId: action.todolistID, id: v1(), title: action.taskTitle, status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, status: action.status} : el)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, title: action.taskTitle} : el)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todoListID]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}