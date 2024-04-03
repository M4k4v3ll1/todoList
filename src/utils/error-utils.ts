import { ResponseType } from "api/todolists-api"
import { Dispatch } from "redux"
import { appActions } from "app/appSlice"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }))
  }
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
export const handleServerNetworkError = (err: ErrorType, dispatch: Dispatch) => {
  dispatch(appActions.setAppError({ error: err.message ? err.message : "Some error occurred" }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}

export type ErrorType = {
  message: string
}
