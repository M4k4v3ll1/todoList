import {Dispatch} from "redux";
import {authAPI, RESULT_CODE} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";

const initState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export const appReducer = (
    state: InitialStateType = initState,
    action: AppReducerActionTypes
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': return {...state, status: action.status}
        case 'APP/SET-ERROR': return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED': return {...state, isInitialized: action.isInitialized}
        default: return state
    }
}

export const setIsInitializedTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(setIsLoggedInAC(true))

            } else {

            }
            dispatch(setIsInitializedAC(true))
        })
        .catch(err => {

        })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ErrorType = string | null
export type InitialStateType = {
    status: RequestStatusType
    error: ErrorType
    isInitialized: boolean

}
export type AppReducerActionTypes =
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof setAppErrorAC> |
    ReturnType<typeof setIsInitializedAC>