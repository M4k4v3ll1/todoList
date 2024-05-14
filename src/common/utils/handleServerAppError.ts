import { Dispatch } from "redux"
import { appActions } from "app/appSlice"
import { BaseResponseType } from "common/types"

/**
 * handleServerAppError - функция, обрабатывающая полученную от сервера ошибку
 * @param data - данные ответа от сервера, содержащие информацию об ошибке
 * @param dispatch
 * @param showGlobalError - флаг, указывающий следует ли отображать глобальное сообщение об ошибке
 * @returns void - ничего
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  showGlobalError: boolean = true,
) => {
  if (showGlobalError) {
    dispatch(
      appActions.setAppError(data.messages.length ? { error: data.messages[0] } : { error: "Some error occurred" }),
    )
  }
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
