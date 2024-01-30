import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    taskTitle: string
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    isDone: boolean
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    taskID: string
    taskTitle: string
}

type ActionsTypes =
    RemoveTaskActionType |
    AddTaskActionType |
    changeTaskStatusActionType |
    changeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskID}
}
export const addTaskAC = (todolistID: string, taskTitle: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistID, taskTitle}
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistID, taskID, isDone}
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, taskTitle}
}

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.taskTitle, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, isDone: action.isDone} : el)}
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
            throw new Error("I don't understand this action type")
    }
}