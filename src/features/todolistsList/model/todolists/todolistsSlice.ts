import { v1 } from "uuid"
import { todolistsApi } from "features/todolistsList/api/todolists/todolistsApi"
import { RequestStatusType } from "app/appSlice"
import { createSlice, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodoLists } from "common/actions/common.actions"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { RESULT_CODE } from "common/enums"
import { TodoListType } from "features/todolistsList/api/todolists/todolistsApi.types"

// constants
export const todoListID1 = v1()
export const todoListID2 = v1()

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodoListDomainType[],
  reducers: {
    changeTodoListFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    // setTodoLists: (state, action: PayloadAction<{ todoLists: TodoListType[] }>) => {
    //   return action.payload.todoLists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    // },
    setTodoListEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodoLists.type, () => {
        return []
      })
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        return action.payload.todoLists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todoList,
          filter: "all",
          entityStatus: "idle",
          title: action.payload.title,
        })
      })
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(changeTodoListTitle.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addMatcher(isRejected(todoListsThunks.deleteTodoList), (state, action) => {
        return state.map((tl) => {
          return { ...tl, entityStatus: "idle" }
        })
      })
  },
})

// thunks
export const fetchTodoLists = createAppAsyncThunk<{ todoLists: TodoListType[] }, void>(
  `${slice.name}/fetchTodoLists`,
  async (_, thunkAPI) => {
    const res = await todolistsApi.getTodoLists()
    return { todoLists: res.data }
  },
)

export const addTodoList = createAppAsyncThunk<{ todoList: TodoListType; title: string }, { title: string }>(
  `${slice.name}/addTodoList1`,
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.createTodoList(arg.title)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { todoList: res.data.data.item, title: arg.title }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const deleteTodoList = createAppAsyncThunk<{ id: string }, { id: string }>(
  `${slice.name}/deleteTodoList`,
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.deleteTodoList(arg.id)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { id: arg.id }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const changeTodoListTitle = createAppAsyncThunk<{ id: string; title: string }, { id: string; title: string }>(
  `${slice.name}/changeTodoListTitle`,
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.updateTodoList(arg.id, arg.title)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { id: arg.id, title: arg.title }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
export const todoListsThunks = { fetchTodoLists, addTodoList, deleteTodoList, changeTodoListTitle }
