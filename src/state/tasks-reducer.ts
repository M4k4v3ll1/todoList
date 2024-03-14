import {TasksStateType} from "../App";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsTypes =
    RemoveTaskActionType |
    AddTaskActionType |
    UpdateTaskActionType |
    ChangeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType |
    SetTodoListsActionType |
    SetTasksActionType

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistID, taskID, model} as const
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, taskTitle} as const
}
export const setTasksAC = (todoListID: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todoListID, tasks} as const
}

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, ...action.model} : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.taskTitle
                } : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todoList.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListID]: action.tasks}
        }
        default:
            return state
    }
}

export const getTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todoListID)
        .then(res => {
            dispatch(setTasksAC(todoListID, res.data.items))
        })
}

export const deleteTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todoListID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todoListID, taskID))
            }
        })
}

export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    todoListsAPI.createTask(todoListID, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
    order?: number
}

export const updateTaskTC = (todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todoListID].find(t => t.id === taskID)
    if (!task) {
        console.log('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        description: task.description,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        order: task.order,
        ...domainModel
    }
    todoListsAPI.updateTask(todoListID, taskID, apiModel)
        .then(res => {
            dispatch(updateTaskAC(todoListID, taskID, domainModel))
        })
}