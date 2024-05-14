import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, AppRootState } from "app/store"
import { BaseResponseType } from "common/types"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectedValue: null | BaseResponseType
}>()
