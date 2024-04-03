import {
  RESULT_CODE,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todoListsAPI,
  UpdateTaskModelType,
} from "api/todolists-api"
import { AppThunk } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { appActions } from "app/appSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todolistsActions } from "features/todolistsList/todolistsSlice"
import { clearTasksAndTodoLists } from "common/actions/common.actions"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todoListID: string; taskID: string }>) => {
      const tasksForTodolist = state[action.payload.todoListID]
      const index = tasksForTodolist.findIndex((t: TaskType) => t.id === action.payload.taskID)
      if (index !== -1) {
        tasksForTodolist.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasksForTodolist = state[action.payload.task.todoListId]
      tasksForTodolist.unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ todoListID: string; taskID: string; model: UpdateDomainTaskModelType }>,
    ) => {
      const tasksForTodolist = state[action.payload.todoListID]
      const index = tasksForTodolist.findIndex((t) => t.id === action.payload.taskID)
      if (index !== -1) {
        tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.model }
      }
    },
    setTasks: (state, action: PayloadAction<{ todoListID: string; tasks: TaskType[] }>) => {
      state[action.payload.todoListID] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodoList, (state, action) => {
        state[action.payload.todoList.id] = []
      })
      .addCase(todolistsActions.removeTodoList, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsActions.setTodoLists, (state, action) => {
        action.payload.todoLists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodoLists.type, () => {
        return {}
      })
  },
})

// thunks
export const fetchTasksTC =
  (todoListID: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todoListsAPI.getTasks(todoListID).then((res) => {
      dispatch(tasksActions.setTasks({ todoListID, tasks: res.data.items }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
export const addTaskTC =
  (todoListID: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todoListsAPI
      .createTask(todoListID, title)
      .then((res) => {
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(tasksActions.addTask({ task: res.data.data.item }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const deleteTaskTC =
  (todoListID: string, taskID: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todoListsAPI
      .deleteTask(todoListID, taskID)
      .then((res) => {
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(tasksActions.removeTask({ todoListID, taskID }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const updateTaskTC =
  (todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
  (dispatch, getState) => {
    const task = getState().tasks[todoListID].find((t) => t.id === taskID)
    if (!task) {
      console.log("task not found in the state")
      return
    }
    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      order: task.order,
      ...domainModel,
    }
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todoListsAPI
      .updateTask(todoListID, taskID, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.updateTask({ todoListID, taskID, model: domainModel }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

// types
type UpdateDomainTaskModelType = {
  description?: string
  title?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: Date
  deadline?: Date
  order?: number
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
