const initState: InitialStateType = {
    status: "idle",
    error: null
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-STATUS', status} as const)
export const setAppErrorAC = (error: ErrorType) => ({type: 'SET-ERROR', error} as const)

export const appReducer = (state: InitialStateType = initState, action: AppReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-STATUS': return {...state, status: action.status}
        case 'SET-ERROR': return {...state, error: action.error}
        default: return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ErrorType = string | null
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type AppReducerActionTypes =
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof setAppErrorAC>