import { instance } from "common/instance"

import { BaseResponseType } from "common/types"
import {
  CreateTaskArgs,
  GetTasksResponseType,
  TaskType,
  UpdateTaskModelType,
} from "features/todolistsList/api/tasks/tasksApi.types"
export const tasksApi = {
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
