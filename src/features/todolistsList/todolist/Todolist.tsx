import React, { FC, memo, useCallback, useEffect, useMemo } from "react"
import Button from "@mui/material/Button"
import { ButtonProps } from "@mui/material/"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { Task } from "./task/Task"
import { FilterValuesType, TodoListDomainType } from "features/todolistsList/todolistsSlice"
import { useDispatch } from "react-redux"
import { tasksThunks } from "features/todolistsList/tasksSlice"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/todolistsApi.types"
import { AddItemForm, EditableSpan } from "common/components"

export type TodoListPropsType = {
  todoList: TodoListDomainType
  tasks: Array<TaskType>
  removeTasks: (todoListID: string, id: string) => void
  changeFilter: (todoListID: string, value: FilterValuesType) => void
  addTask: (todoListID: string, newTaskTitle: string) => void
  changeTaskStatus: (todoListID: string, id: string, status: TaskStatuses) => void
  changeTaskTitle: (todoListID: string, id: string, newValue: string) => void
  changeTodoListTitle: (todoListID: string, todoListTitle: string) => void
  removeTodoList: (todoListID: string) => void
  demoMode?: boolean
}

// В props сразу делаем деструктурирующее присваивание: вместо (props) сразу делаем ({title, tasks}). И в дальнейшем не нужно писать props.title, а сразу title
export const Todolist: FC<TodoListPropsType> = memo(
  ({
    todoList,
    tasks,
    removeTasks,
    changeFilter,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    changeTodoListTitle,
    removeTodoList,
    demoMode = false,
  }) => {
    const dispatch = useDispatch<any>()
    useEffect(() => {
      if (demoMode) {
        return
      }
      dispatch(tasksThunks.fetchTasks(todoList.id))
    }, [])
    const onClickAllHandler = useCallback(() => changeFilter(todoList.id, "all"), [changeFilter, todoList.id])
    const onClickActiveHandler = useCallback(() => changeFilter(todoList.id, "active"), [changeFilter, todoList.id])
    const onClickCompletedHandler = useCallback(
      () => changeFilter(todoList.id, "completed"),
      [changeFilter, todoList.id],
    )
    const onClickRemoveTodoListHandler = () => {
      removeTodoList(todoList.id)
    }
    const changeTodoListTitleHandler = useCallback(
      (newTodoListTitle: string) => {
        changeTodoListTitle(todoList.id, newTodoListTitle)
      },
      [changeTodoListTitle, todoList.id],
    )
    const addItem = useCallback(
      (newTaskTitle: string) => {
        addTask(todoList.id, newTaskTitle)
      },
      [addTask, todoList.id],
    )
    const onChangeStatusHandler = useCallback(
      (taskID: string, status: TaskStatuses) => {
        changeTaskStatus(todoList.id, taskID, status)
      },
      [changeTaskStatus, todoList.id],
    )
    let filteredTasks = tasks

    filteredTasks = useMemo(() => {
      console.log("useMemo")
      if (todoList.filter === "active") {
        filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
      }
      if (todoList.filter === "completed") {
        filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed)
      }
      return filteredTasks
    }, [todoList.filter, tasks])
    const listItem: JSX.Element =
      filteredTasks.length === 0 ? (
        <div>Please add task</div>
      ) : (
        <div>
          {" "}
          {filteredTasks?.map((t) => {
            return (
              <Task
                key={t.id}
                task={t}
                todoListID={todoList.id}
                removeTasks={removeTasks}
                changeTaskStatus={onChangeStatusHandler}
                changeTaskTitle={changeTaskTitle}
              />
            )
          })}
        </div>
      )
    return (
      <div>
        <h3>
          <EditableSpan title={todoList.title} onChange={changeTodoListTitleHandler} />
          <IconButton onClick={onClickRemoveTodoListHandler} disabled={todoList.entityStatus === "loading"}>
            <Delete />
          </IconButton>
        </h3>
        <div>
          <AddItemForm addItem={addItem} disabled={todoList.entityStatus === "loading"} />
          {listItem}
          <MyButton
            variant={todoList.filter === "all" ? "contained" : "text"}
            name={"all"}
            onClick={onClickAllHandler}
          />
          <MyButton
            variant={todoList.filter === "active" ? "contained" : "text"}
            name={"active"}
            onClick={onClickActiveHandler}
          />
          <MyButton
            variant={todoList.filter === "completed" ? "contained" : "text"}
            name={"completed"}
            onClick={onClickCompletedHandler}
          />
        </div>
      </div>
    )
  },
)

type MyButtonPropsType = ButtonProps & {}

const MyButton: FC<MyButtonPropsType> = memo(({ variant, name, onClick }) => {
  return (
    <Button variant={variant} name={name} onClick={onClick}>
      {name}
    </Button>
  )
})
