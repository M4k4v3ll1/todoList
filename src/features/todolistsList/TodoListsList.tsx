import React, { FC, useCallback, useEffect } from "react"
import { useAppSelector } from "app/store"
import {
  addTodoListTC,
  changeTodoListTitleTC,
  deleteTodoListTC,
  FilterValuesType,
  fetchTodoListsTC,
  TodoListDomainType,
  todolistsActions,
} from "features/todolistsList/todolistsSlice"
import { addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC } from "features/todolistsList/tasksSlice"
import { TaskStatuses } from "api/todolists-api"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { AddItemForm } from "components/addItemForm/AddItemForm"
import { Todolist } from "./todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"

type TodoListsListPropsType = {
  demoMode?: boolean
}

export const TodoListsList: FC<TodoListsListPropsType> = ({ demoMode = false }) => {
  const dispatch = useDispatch<any>()
  const todoLists = useAppSelector<TodoListDomainType[]>((state) => state.todoLists)
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

  useEffect(() => {
    if (demoMode || !isLoggedIn) {
      return
    }
    dispatch(fetchTodoListsTC())
  }, [])
  const removeTasks = useCallback(
    (todoListID: string, taskID: string) => {
      dispatch(deleteTaskTC(todoListID, taskID))
    },
    [dispatch],
  )
  const addTask = useCallback(
    (todoListID: string, newTaskTitle: string) => {
      dispatch(addTaskTC(todoListID, newTaskTitle))
    },
    [dispatch],
  )
  const changeTaskStatus = useCallback(
    (todoListID: string, id: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todoListID, id, { status }))
    },
    [dispatch],
  )
  const changeFilter = useCallback(
    (id: string, filter: FilterValuesType) => {
      dispatch(todolistsActions.changeTodoListFilter({ id, filter }))
    },
    [dispatch],
  )
  const removeTodoList = useCallback(
    (todoListID: string) => {
      dispatch(deleteTodoListTC(todoListID))
    },
    [dispatch],
  )
  const addTodoList = useCallback(
    (todoListTitle: string) => {
      dispatch(addTodoListTC(todoListTitle))
    },
    [dispatch],
  )
  const changeTaskTitle = useCallback(
    (todoListID: string, id: string, newValue: string) => {
      dispatch(updateTaskTC(todoListID, id, { title: newValue }))
    },
    [dispatch],
  )
  const changeTodoListTitle = useCallback(
    (todoListID: string, newTodoListTitle: string) => {
      dispatch(changeTodoListTitleTC(todoListID, newTodoListTitle))
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
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
