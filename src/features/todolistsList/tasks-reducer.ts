import {
    addTodoListAC,
    removeTodoListAC,
    setTodoListsAC
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {AppReducerActionTypes, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

// actions
export const removeTaskAC = (todolistID: string, taskID: string) =>
    ({type: 'REMOVE-TASK', todolistID, taskID} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistID, taskID, model} as const)
export const setTasksAC = (todoListID: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todoListID, tasks} as const)

// initial state
const initialState: TasksStateType = {}

// reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskID ? {...el, ...action.model} : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case 'SET-TODOLISTS':
            const copyState = {...state}
            action.todoLists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        case 'SET-TASKS':
            return {...state, [action.todoListID]: action.tasks}
        default:
            return state
    }
}

// thunks
export const fetchTasksTC = (todoListID: string) =>
    (dispatch: Dispatch<TasksReducerActionTypes | AppReducerActionTypes>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.getTasks(todoListID)
            .then(res => {
                dispatch(setTasksAC(todoListID, res.data.items))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
export const deleteTaskTC = (todoListID: string, taskID: string) =>
    (dispatch: Dispatch<TasksReducerActionTypes>) => {
        todoListsAPI.deleteTask(todoListID, taskID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todoListID, taskID))
                }
            })
    }
export const addTaskTC = (todoListID: string, title: string) =>
    (dispatch: Dispatch<TasksReducerActionTypes | AppReducerActionTypes>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.createTask(todoListID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const updateTaskTC = (todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: ThunkDispatchTypes, getState: () => AppRootState) => {
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
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todoListID, taskID, domainModel))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
    }

// types
type TasksReducerActionTypes =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof setTodoListsAC> |
    ReturnType<typeof setTasksAC>
type ThunkDispatchTypes = Dispatch<TasksReducerActionTypes | AppReducerActionTypes>
type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
    order?: number
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}