import { TypedUseSelectorHook, useSelector } from "react-redux"
import { todoListsReducer } from "features/todolistsList/model/todolists/todolistsSlice"
import { tasksReducer } from "features/todolistsList/model/tasks/tasksSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export type AppRootState = ReturnType<typeof store.getState>
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
