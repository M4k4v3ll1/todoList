import {Dispatch} from "redux";
import {authAPI, RESULT_CODE} from "../../api/todolists-api";
import {AppReducerActionTypes, setAppStatusAC} from "../../app/app-reducer";
import {LoginType} from "./Login";
import {ErrorType, handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// initial state
const initState: InitialStateType = {
    isLoggedIn: false
}

// reducer
export const authReducer = (state: InitialStateType = initState, action: AuthReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

//thunk
export const loginTC = (data: LoginType) => async (dispatch: ThunkDispatchTypes) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerNetworkError(err as ErrorType, dispatch)
    }
}

export const logoutTC = () => (dispatch: ThunkDispatchTypes) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else (
                handleServerAppError(res.data, dispatch)
            )
        })
        .catch(err => {
            handleServerNetworkError(err as ErrorType, dispatch)
        })
}

// types
type InitialStateType = {
    isLoggedIn: boolean
}
type AuthReducerActionTypes =
    ReturnType<typeof setIsLoggedInAC>

type ThunkDispatchTypes = Dispatch<AuthReducerActionTypes | AppReducerActionTypes>