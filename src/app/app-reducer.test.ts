import { appActions, AppInitialState, appReducer } from "app/appSlice"

let initState: AppInitialState

beforeEach(() => {
  initState = {
    status: "idle",
    error: null,
    isInitialized: false,
  }
})

test("error message should be set", () => {
  const endState = appReducer(initState, appActions.setAppError({ error: "internal error" }))
  expect(endState.error).toBe("internal error")
})
test("correct status should be set", () => {
  const endState = appReducer(initState, appActions.setAppStatus({ status: "succeeded" }))
  expect(endState.status).toBe("succeeded")
})
