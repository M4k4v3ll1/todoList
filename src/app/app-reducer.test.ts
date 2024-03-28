import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let initState: InitialStateType

beforeEach(() => {
    initState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})


test('error message should be set', () => {
    const endState: InitialStateType = appReducer(initState, setAppErrorAC('internal error'))
    expect(endState.error).toBe('internal error')
})
test('correct status should be set', () => {
    const endState: InitialStateType = appReducer(initState, setAppStatusAC("succeeded"))
    expect(endState.status).toBe('succeeded')
})