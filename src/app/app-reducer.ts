const initState: InitialStateType = {
    status: "loading",
    error: null
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)

export const appReducer = (
    state: InitialStateType = initState,
    action: AppReducerActionTypes
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': return {...state, status: action.status}
        case 'APP/SET-ERROR': return {...state, error: action.error}
        default: return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ErrorType = string | null
export type InitialStateType = {
    status: RequestStatusType
    error: ErrorType
}
export type AppReducerActionTypes =
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof setAppErrorAC>