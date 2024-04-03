import { Dispatch } from "redux"
import { authAPI, RESULT_CODE } from "api/todolists-api"
import { authActions } from "features/login/authSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const setIsInitializedTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      }
      dispatch(appActions.setIsInitialized({ isInitialized: true }))
    })
    .catch((err) => {})
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialState = ReturnType<typeof slice.getInitialState>
export const appReducer = slice.reducer
export const appActions = slice.actions
