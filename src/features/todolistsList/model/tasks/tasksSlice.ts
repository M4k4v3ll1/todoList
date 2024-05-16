import { appActions } from "app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { todoListsThunks } from "features/todolistsList/model/todolists/todolistsSlice"
import { clearTasksAndTodoLists } from "common/actions/common.actions"
import { createAppAsyncThunk } from "common/utils"
import { RESULT_CODE, TaskPriorities, TaskStatuses } from "common/enums"
import { CreateTaskArgs, TaskType, UpdateTaskModelType } from "features/todolistsList/api/tasks/tasksApi.types"
import { tasksApi } from "features/todolistsList/api/tasks/tasksApi"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todoListsThunks.addTodoList.fulfilled, (state, action) => {
        state[action.payload.todoList.id] = []
      })
      .addCase(todoListsThunks.deleteTodoList.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todoListsThunks.fetchTodoLists.fulfilled, (state, action) => {
        action.payload.todoLists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodoLists.type, () => {
        return {}
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todoListID] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.task.todoListId]
        tasksForTodolist.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todoListID]
        const index = tasksForTodolist.findIndex((t) => t.id === action.payload.taskID)
        if (index !== -1) {
          tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.model }
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todoListID]
        const index = tasksForTodolist.findIndex((t: TaskType) => t.id === action.payload.taskID)
        if (index !== -1) {
          tasksForTodolist.splice(index, 1)
        }
      })
  },
})

// thunks
const fetchTasks = createAppAsyncThunk<{ todoListID: string; tasks: TaskType[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todoListID, thunkAPI) => {
    const res = await tasksApi.getTasks(todoListID)
    return { todoListID, tasks: res.data.items }
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgs>(
  `${slice.name}/addTask`,
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.createTask(arg)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { task: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const deleteTask = createAppAsyncThunk<DeleteTaskArgs, DeleteTaskArgs>(
  `${slice.name}/deleteTask`,
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.deleteTask(arg.todoListID, arg.taskID)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return arg
    }
    return rejectWithValue(res.data)
  },
)

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const task = getState().tasks[arg.todoListID].find((t) => t.id === arg.taskID)
    if (!task) {
      dispatch(appActions.setAppError({ error: "task not found in the state" }))
      return rejectWithValue(null)
    }
    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      order: task.order,
      ...arg.model,
    }
    const res = await tasksApi.updateTask(arg.todoListID, arg.taskID, apiModel)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return arg
    } else {
      return rejectWithValue(res.data)
    }
  },
)

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
type DeleteTaskArgs = {
  todoListID: string
  taskID: string
}
type UpdateTaskArgs = {
  todoListID: string
  taskID: string
  model: UpdateDomainTaskModelType
}
export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, deleteTask }
