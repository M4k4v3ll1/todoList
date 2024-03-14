import axios from "axios";

const config = {
    withCredentials: true
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...config
})

export type TodoListType = {
    id: string
    title: string
    addedData: Date
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
    order: number
}
type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export const todoListsAPI = {
    getTodoLists() {
        const promise = instance.get<TodoListType[]>('todo-lists')
        return promise
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('/todo-lists', {title})
    },
    deleteTodoList(todoListID: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todoListID}`)
    },
    updateTodoList(todoListID: string, title: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todoListID}`, {title})
    },
    getTasks(todoListID: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todoListID}/tasks`)
    },
    createTask(todoListID: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListID}/tasks`, {title: taskTitle})
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTask(todoListID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListID}/tasks/${taskID}`, model)
    }
}