import {TaskType} from "../components/Todolist";
import {v1} from "uuid";

export const taskReducer = (state: TaskType[], action: TaskReducerType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(t => t.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return [newTask, ...state]
        }
        case 'CHANGE-STATUS': {
            return state.map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
        }
        default:
            return state
    }
}

type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeStatusACType
type RemoveTaskACType = ReturnType<typeof removeTasksAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>

export const removeTasksAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id
        }
    } as const
}
export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}
export const changeStatusAC = (id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            id,
            isDone
        }
    } as const
}