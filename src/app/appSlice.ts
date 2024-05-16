import { AnyAction, createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { todoListsThunks } from "features/todolistsList/model/todolists/todolistsSlice"
import { tasksThunks } from "features/todolistsList/model/tasks/tasksSlice"
import { authThunks } from "features/auth/model/authSlice"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed"
        if (action.payload) {
          if (
            action.type === todoListsThunks.addTodoList.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.initializeApp.rejected.type
          )
            return
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred"
        }
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state, action) => {
        state.isInitialized = true
      })
  },
})

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialState = ReturnType<typeof slice.getInitialState>
export const appReducer = slice.reducer
export const appActions = slice.actions
// export const appThunks = { setInitialized }
