import React, { FC, memo, useCallback } from "react"
import { SuperCheckbox } from "common/components/superCheckbox/SuperCheckbox"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/todolistsApi.types"

type TaskPropsType = {
  task: TaskType
  todoListID: string
  removeTasks: (todoListID: string, id: string) => void
  changeTaskStatus: (id: string, status: TaskStatuses) => void
  changeTaskTitle: (todoListID: string, id: string, newValue: string) => void
}

export const Task: FC<TaskPropsType> = memo(({ task, todoListID, removeTasks, changeTaskStatus, changeTaskTitle }) => {
  const onRemoveTaskHandler = useCallback(() => removeTasks(todoListID, task.id), [removeTasks, todoListID, task])
  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      changeTaskTitle(todoListID, task.id, newValue)
    },
    [changeTaskTitle, task],
  )
  const onChangeTaskStatusHandler = useCallback(
    (status: boolean) => {
      changeTaskStatus(task.id, status ? TaskStatuses.Completed : TaskStatuses.New)
    },
    [changeTaskStatus, task],
  )
  return (
    <div>
      <SuperCheckbox callback={onChangeTaskStatusHandler} checked={task.status === TaskStatuses.Completed} />
      <EditableSpan
        title={task.title}
        isDone={task.status === TaskStatuses.Completed}
        onChange={onChangeTitleHandler}
      />
      <IconButton onClick={onRemoveTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
})
