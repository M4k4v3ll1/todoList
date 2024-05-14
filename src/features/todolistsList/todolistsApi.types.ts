import { TaskPriorities, TaskStatuses } from "common/enums"

export type CreateTaskArgs = {
  todoListID: string
  taskTitle: string
}
export type TodoListType = {
  id: string
  title: string
  addedData: Date
  order: number
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
export type GetTasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string
}
