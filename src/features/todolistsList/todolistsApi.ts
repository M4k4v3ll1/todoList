import { instance } from "common/instance/instance"
import { BaseResponseType } from "common/types"
import {
  CreateTaskArgs,
  GetTasksResponseType,
  TaskType,
  TodoListType,
  UpdateTaskModelType,
} from "features/todolistsList/todolistsApi.types"

export const todolistsApi = {
  getTodoLists() {
    return instance.get<TodoListType[]>("todo-lists")
  },
  createTodoList(title: string) {
    return instance.post<BaseResponseType<{ item: TodoListType }>>("/todo-lists", { title })
  },
  deleteTodoList(todoListID: string) {
    return instance.delete<BaseResponseType<{}>>(`/todo-lists/${todoListID}`)
  },
  updateTodoList(todoListID: string, title: string) {
    return instance.put<BaseResponseType<{}>>(`/todo-lists/${todoListID}`, { title })
  },
  getTasks(todoListID: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todoListID}/tasks`)
  },
  createTask(arg: CreateTaskArgs) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${arg.todoListID}/tasks`, {
      title: arg.taskTitle,
    })
  },
  deleteTask(todoListID: string, taskID: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todoListID}/tasks/${taskID}`)
  },
  updateTask(todoListID: string, taskID: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todoListID}/tasks/${taskID}`, model)
  },
}
