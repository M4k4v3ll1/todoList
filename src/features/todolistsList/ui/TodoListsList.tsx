import React, { FC, useCallback, useEffect } from "react"
import { useAppSelector } from "app/store"
import {
  FilterValuesType,
  TodoListDomainType,
  todoListsActions,
  todoListsThunks,
} from "features/todolistsList/model/todolists/todolistsSlice"
import { TasksStateType, tasksThunks } from "features/todolistsList/model/tasks/tasksSlice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Todolist } from "features/todolistsList/ui/todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { TaskStatuses } from "common/enums/enums"
import { AddItemForm } from "common/components"
import { selectIsLoggedIn } from "features/auth/model/auth.selectors"
import { useActions } from "common/hooks/useActions"

type TodoListsListPropsType = {
  demoMode?: boolean
}

export const TodoListsList: FC<TodoListsListPropsType> = ({ demoMode = false }) => {
  const todoLists = useAppSelector<TodoListDomainType[]>((state) => state.todoLists)
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
  const { fetchTodoLists, addTodoList } = useActions(todoListsThunks)

  useEffect(() => {
    if (demoMode || !isLoggedIn) {
      return
    }
    fetchTodoLists()
    //dispatch(todoListsThunks.fetchTodoLists())
  }, [])

  const addTodoListCb = (title: string) => {
    return addTodoList({ title }).unwrap()
  }

  if (!isLoggedIn) {
    return <Navigate to={"/auth"} />
  }

  return (
    <>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodoListCb} />
      </Grid>
      <Grid container spacing={3}>
        {todoLists.map((el) => {
          return (
            <Grid key={el.id} item>
              <Paper sx={{ p: "0 20px 20px 20px" }}>
                <Todolist todoList={el} tasks={tasks[el.id]} demoMode={demoMode} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
