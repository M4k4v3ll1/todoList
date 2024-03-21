import {AppReducerActionTypes, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppReducerActionTypes>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC("failed"))
}
export const handleServerNetworkError = (err: ErrorType, dispatch: Dispatch<AppReducerActionTypes>) => {
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
    dispatch(setAppStatusAC("failed"))
}

type ErrorType = {
    message: string
}