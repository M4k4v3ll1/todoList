import React from "react"
import { SuperCheckbox } from "common/components/superCheckbox/SuperCheckbox"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/api/tasks/tasksApi.types"
import { tasksThunks } from "features/todolistsList/model/tasks/tasksSlice"
import { useActions } from "common/hooks/useActions"
import s from "features/todolistsList/ui/todolist/Tasks/task/Task.module.css"

type Props = {
  task: TaskType
  todoListID: string
}

export const Task = ({ task, todoListID }: Props) => {
  const { updateTask, deleteTask } = useActions(tasksThunks)

  const removeTaskHandler = () => {
    deleteTask({ todoListID, taskID: task.id })
  }
  //{todoListID: string, taskID: string, model: UpdateDomainTaskModelType}
  const changeTaskTitleHandler = (newValue: string) => {
    updateTask({ todoListID, taskID: task.id, model: { title: newValue } })
  }

  const changeTaskStatusHandler = (checkboxValue: boolean) => {
    let status = checkboxValue ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({ todoListID, taskID: task.id, model: { status } })
  }

  let isTaskCompleted = task.status === TaskStatuses.Completed
  return (
    <div key={task.id} className={isTaskCompleted ? s.isDone : ""}>
      <SuperCheckbox callback={changeTaskStatusHandler} checked={isTaskCompleted} />
      <EditableSpan title={task.title} isDone={isTaskCompleted} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
