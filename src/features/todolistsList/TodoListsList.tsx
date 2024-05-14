import React, { FC, useCallback, useEffect } from "react"
import { useAppSelector } from "app/store"
import {
  FilterValuesType,
  TodoListDomainType,
  todoListsActions,
  todoListsThunks,
} from "features/todolistsList/todolistsSlice"
import { TasksStateType, tasksThunks } from "features/todolistsList/tasksSlice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Todolist } from "./todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { TaskStatuses } from "common/enums/enums"
import { AddItemForm } from "common/components"
import { selectIsLoggedIn } from "features/auth/model/auth.selectors"

type TodoListsListPropsType = {
  demoMode?: boolean
}

export const TodoListsList: FC<TodoListsListPropsType> = ({ demoMode = false }) => {
  const dispatch = useDispatch<any>()
  const todoLists = useAppSelector<TodoListDomainType[]>((state) => state.todoLists)
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)

  useEffect(() => {
    if (demoMode || !isLoggedIn) {
      return
    }
    dispatch(todoListsThunks.fetchTodoLists())
  }, [])
  const removeTasks = useCallback(
    (todoListID: string, taskID: string) => {
      dispatch(tasksThunks.deleteTask({ todoListID, taskID }))
    },
    [dispatch],
  )
  const addTask = useCallback(
    (todoListID: string, newTaskTitle: string) => {
      dispatch(tasksThunks.addTask({ todoListID, taskTitle: newTaskTitle }))
    },
    [dispatch],
  )
  const changeTaskStatus = useCallback(
    (todoListID: string, taskID: string, status: TaskStatuses) => {
      dispatch(tasksThunks.updateTask({ todoListID, taskID, model: { status } }))
    },
    [dispatch],
  )
  const changeFilter = useCallback(
    (id: string, filter: FilterValuesType) => {
      dispatch(todoListsActions.changeTodoListFilter({ id, filter }))
    },
    [dispatch],
  )
  const removeTodoList = useCallback(
    (todoListID: string) => {
      dispatch(todoListsThunks.deleteTodoList({ id: todoListID }))
    },
    [dispatch],
  )
  const addTodoList = useCallback(
    (todoListTitle: string) => {
      dispatch(todoListsThunks.addTodoList({ title: todoListTitle }))
    },
    [dispatch],
  )
  const changeTaskTitle = useCallback(
    (todoListID: string, taskID: string, newValue: string) => {
      dispatch(tasksThunks.updateTask({ todoListID, taskID, model: { title: newValue } }))
    },
    [dispatch],
  )
  const changeTodoListTitle = useCallback(
    (todoListID: string, newTodoListTitle: string) => {
      dispatch(todoListsThunks.changeTodoListTitle({ id: todoListID, title: newTodoListTitle }))
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={"/auth"} />
  }

  return (
    <>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todoLists.map((el) => {
          return (
            <Grid key={el.id} item>
              <Paper sx={{ p: "0 20px 20px 20px" }}>
                <Todolist
                  todoList={el}
                  tasks={tasks[el.id]}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  removeTasks={removeTasks}
                  changeFilter={changeFilter}
                  changeTodoListTitle={changeTodoListTitle}
                  removeTodoList={removeTodoList}
                  demoMode={demoMode}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
