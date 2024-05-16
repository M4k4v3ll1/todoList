import React, { useEffect } from "react"
import { TodoListDomainType } from "features/todolistsList/model/todolists/todolistsSlice"
import { tasksThunks } from "features/todolistsList/model/tasks/tasksSlice"
import { AddItemForm } from "common/components"
import { TaskType } from "features/todolistsList/api/tasks/tasksApi.types"
import { useActions } from "common/hooks/useActions"
import { FilterTasksButtons } from "features/todolistsList/ui/todolist/filterTasksButtons"
import { Tasks } from "features/todolistsList/ui/todolist/Tasks/Tasks"
import { TodoListTitle } from "features/todolistsList/ui/todolist/todoListTitle/TodoListTitle"

type Props = {
  todoList: TodoListDomainType
  tasks: Array<TaskType>
  demoMode?: boolean
}

export const Todolist = ({ todoList, tasks, demoMode = false }: Props) => {
  const { fetchTasks, addTask } = useActions(tasksThunks)

  useEffect(() => {
    if (demoMode) {
      return
    }
    fetchTasks(todoList.id)
  }, [])

  const addTaskCb = (taskTitle: string) => {
    return addTask({ todoListID: todoList.id, taskTitle }).unwrap()
  }

  const tasksList: JSX.Element =
    tasks.length === 0 ? (
      <div>Please add task</div>
    ) : (
      <div>
        {" "}
        <Tasks todoList={todoList} tasks={tasks} />
      </div>
    )

  return (
    <div>
      <TodoListTitle todoList={todoList} />
      <AddItemForm addItem={addTaskCb} disabled={todoList.entityStatus === "loading"} />
      <div>
        {tasksList}
        <FilterTasksButtons todoList={todoList} />
      </div>
    </div>
  )
}
