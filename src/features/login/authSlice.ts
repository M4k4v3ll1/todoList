import { authAPI, RESULT_CODE } from "api/todolists-api"
import { appActions } from "app/appSlice"
import { LoginType } from "./Login"
import { ErrorType, handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { clearTasksAndTodoLists } from "common/actions/common.actions"

// actions
export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET-IS-LOGGED-IN", value }) as const

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

//thunk
export const loginTC =
  (data: LoginType): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as ErrorType, dispatch)
    }
  }

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(clearTasksAndTodoLists())
      } else handleServerAppError(res.data, dispatch)
    })
    .catch((err) => {
      handleServerNetworkError(err as ErrorType, dispatch)
    })
}

export const authReducer = slice.reducer
export const authActions = slice.actions
