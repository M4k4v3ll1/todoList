import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListID1, todoListID2} from "./todolists-reducer";

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
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistID, taskID, isDone} as const
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, taskTitle} as const
}

const initialState: TasksStateType = {
    [todoListID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: "Book", isDone: true},
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Tea", isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
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
            return state
    }
}