import { AppRootState } from "app/store"

export const selectStatus = (state: AppRootState) => state.app.status
export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized
export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
