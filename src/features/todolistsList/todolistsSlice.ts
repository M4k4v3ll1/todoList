import { v1 } from "uuid"
import { RESULT_CODE, todoListsAPI, TodoListType } from "api/todolists-api"
import { appActions, RequestStatusType } from "app/appSlice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { clearTasksAndTodoLists } from "common/actions/common.actions"

// constants
export const todoListID1 = v1()
export const todoListID2 = v1()

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodoListDomainType[],
  reducers: {
    removeTodoList: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodoList: (state, action: PayloadAction<{ todoList: TodoListType; title: string }>) => {
      state.unshift({
        ...action.payload.todoList,
        filter: "all",
        entityStatus: "idle",
        title: action.payload.title,
      })
    },
    changeTodoListTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    changeTodoListFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    setTodoLists: (state, action: PayloadAction<{ todoLists: TodoListType[] }>) => {
      return action.payload.todoLists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    },
    setTodoListEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodoLists.type, () => {
      return []
    })
  },
})

// thunks
export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todoListsAPI.getTodoLists().then((res) => {
    dispatch(todolistsActions.setTodoLists({ todoLists: res.data }))
    dispatch(appActions.setAppStatus({ status: "succeeded" }))
  })
}
export const addTodoListTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todoListsAPI
      .createTodoList(title)
      .then((res) => {
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(todolistsActions.addTodoList({ todoList: res.data.data.item, title }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const deleteTodoListTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(todolistsActions.setTodoListEntityStatus({ id, status: "loading" }))
    todoListsAPI
      .deleteTodoList(id)
      .then((res) => {
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(todolistsActions.removeTodoList({ id }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          if (res.data.messages.length) {
            dispatch(appActions.setAppError({ error: res.data.messages[0] }))
          } else dispatch(appActions.setAppError({ error: "Some error occurred" }))
        }
        dispatch(appActions.setAppStatus({ status: "failed" }))
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const changeTodoListTitleTC =
  (id: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todoListsAPI
      .updateTodoList(id, title)
      .then((res) => {
        dispatch(todolistsActions.changeTodoListTitle({ id, title }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

// types

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const todoListsReducer = slice.reducer
export const todolistsActions = slice.actions
