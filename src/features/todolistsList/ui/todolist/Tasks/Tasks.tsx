import React from "react"
import { Task } from "features/todolistsList/ui/todolist/Tasks/task/Task"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/api/tasks/tasksApi.types"
import { TodoListDomainType } from "features/todolistsList/model/todolists/todolistsSlice"

type Props = {
  todoList: TodoListDomainType
  tasks: Array<TaskType>
}

export const Tasks = ({ todoList, tasks }: Props) => {
  let filteredTasks = tasks

  if (todoList.filter === "active") {
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (todoList.filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return <>{filteredTasks?.map((t) => <Task key={t.id} task={t} todoListID={todoList.id} />)}</>
}
