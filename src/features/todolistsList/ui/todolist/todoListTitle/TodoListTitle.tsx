import React from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { TodoListDomainType, todoListsThunks } from "features/todolistsList/model/todolists/todolistsSlice"
import { useActions } from "common/hooks/useActions"

type Props = {
  todoList: TodoListDomainType
}
export const TodoListTitle = ({ todoList }: Props) => {
  const { id, title, entityStatus } = todoList
  const { changeTodoListTitle, deleteTodoList } = useActions(todoListsThunks)
  const removeTodoListHandler = () => {
    deleteTodoList({ id })
  }
  const changeTodoListTitleHandler = (title: string) => {
    changeTodoListTitle({ id, title })
  }
  return (
    <h3>
      <EditableSpan title={title} onChange={changeTodoListTitleHandler} />
      <IconButton onClick={removeTodoListHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  )
}
