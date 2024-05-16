import React from "react"
import Button from "@mui/material/Button"
import {
  FilterValuesType,
  TodoListDomainType,
  todoListsActions,
} from "features/todolistsList/model/todolists/todolistsSlice"
import { useActions } from "common/hooks/useActions"

type Props = {
  todoList: TodoListDomainType
}
export const FilterTasksButtons = ({ todoList }: Props) => {
  const { id, filter } = todoList
  const { changeTodoListFilter } = useActions(todoListsActions)
  const changeTodoFilterHandler = (filter: FilterValuesType) => {
    changeTodoListFilter({ id, filter })
  }

  return (
    <>
      <Button variant={filter === "all" ? "contained" : "text"} onClick={() => changeTodoFilterHandler("all")}>
        All
      </Button>
      <Button variant={filter === "active" ? "contained" : "text"} onClick={() => changeTodoFilterHandler("active")}>
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "contained" : "text"}
        onClick={() => changeTodoFilterHandler("completed")}
      >
        Completed
      </Button>
    </>
  )
}
