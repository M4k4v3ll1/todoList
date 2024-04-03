import { UnknownAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { todoListsReducer } from "features/todolistsList/todolistsSlice"
import { tasksReducer } from "features/todolistsList/tasksSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/login/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export type AppRootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export const store = configureStore({
  reducer: {
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})

// @ts-ignore
window.store = store
