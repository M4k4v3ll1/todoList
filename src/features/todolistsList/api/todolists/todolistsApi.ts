import { instance } from "common/instance/instance"
import { BaseResponseType } from "common/types"
import { TodoListType } from "features/todolistsList/api/todolists/todolistsApi.types"

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
}
