import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { todoListsReducer } from "../features/todolistsList/todolists-reducer";
import {tasksReducer} from "../features/todolistsList/tasks-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/login/auth-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

