import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodoLists } from "common/actions/common.actions"
import { authAPI } from "features/auth/api/authApi"
import { RESULT_CODE } from "common/enums"
import { createAppAsyncThunk } from "common/utils"
import { LoginType } from "features/auth/api/authApi.types"

// actions

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      //isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
      isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },
})

//thunk
export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue }) => {
    const res = await authAPI.me()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
// export const _initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
//   `${slice.name}/initializeApp`,
//   async (_, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI
//     return thunkTryCatch(thunkAPI, async () => {
//       const res = await authAPI.me()
//       if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
//         return { isLoggedIn: true }
//       } else {
//         handleServerAppError(res.data, dispatch, false)
//         return rejectWithValue(res.data)
//       }
//     }).finally(() => {
//       dispatch(appActions.setAppInitialized({ isInitialized: true }))
//     })
//   },
// )

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, { data: LoginType }>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg.data)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
// export const _login = createAppAsyncThunk<{ isLoggedIn: boolean }, { data: LoginType }>(
//   `${slice.name}/login`,
//   async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI
//     dispatch(appActions.setAppStatus({ status: "loading" }))
//     try {
//       const res = await authAPI.login(arg.data)
//       if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
//         dispatch(appActions.setAppStatus({ status: "succeeded" }))
//         return { isLoggedIn: true }
//       } else {
//         const isShowAppError = !res.data.fieldsErrors.length
//         handleServerAppError(res.data, dispatch, isShowAppError)
//         return rejectWithValue(res.data)
//       }
//     } catch (e) {
//       handleServerNetworkError(e as ErrorType, dispatch)
//       return rejectWithValue(null)
//     }
//   },
// )

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.logout()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(clearTasksAndTodoLists())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

// export const _logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
//   `${slice.name}/logout`,
//   async (_, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI
//     dispatch(appActions.setAppStatus({ status: "loading" }))
//     try {
//       const res = await authAPI.logout()
//       if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
//         dispatch(appActions.setAppStatus({ status: "succeeded" }))
//         dispatch(clearTasksAndTodoLists())
//         return { isLoggedIn: false }
//       } else {
//         handleServerAppError(res.data, dispatch)
//         return rejectWithValue(null)
//       }
//     } catch (e) {
//       handleServerNetworkError(e as ErrorType, dispatch)
//       return rejectWithValue(null)
//     }
//   },
// )

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { login, logout, initializeApp }
