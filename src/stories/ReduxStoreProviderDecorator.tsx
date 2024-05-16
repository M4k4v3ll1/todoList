import React from "react"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { tasksReducer } from "features/todolistsList/model/tasks/tasksSlice"
import { todoListsReducer } from "features/todolistsList/model/todolists/todolistsSlice"
import { v1 } from "uuid"
import { AppRootState } from "../app/store"
import { thunk } from "redux-thunk"
import { appReducer } from "app/appSlice"
import { TaskPriorities, TaskStatuses } from "common/enums"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
})

const initialGlobalState: AppRootState = {
  todoLists: [
    {
      id: "todoListID1",
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedData: new Date(),
      order: 0,
    },
    {
      id: "todoListID2",
      title: "What to buy",
      filter: "all",
      entityStatus: "loading",
      addedData: new Date(),
      order: 0,
    },
  ],
  tasks: {
    ["todoListID1"]: [
      {
        todoListId: "todoListID1",
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.High,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        todoListId: "todoListID1",
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.High,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        todoListId: "todoListID1",
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.InProgress,
        description: "",
        priority: TaskPriorities.High,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        todoListId: "todoListID1",
        id: v1(),
        title: "Rest API",
        status: TaskStatuses.InProgress,
        description: "",
        priority: TaskPriorities.High,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        todoListId: "todoListID1",
        id: v1(),
        title: "GraphQL",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
    ],
    ["todoListID2"]: [
      {
        todoListId: "todoListID2",
        id: v1(),
        title: "Book",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Middle,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        todoListId: "todoListID2",
        id: v1(),
        title: "Milk",
        status: TaskStatuses.InProgress,
        description: "",
        priority: TaskPriorities.High,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        todoListId: "todoListID2",
        id: v1(),
        title: "Tea",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.High,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
    ],
  },
  app: {
    status: "idle",
    error: null,
    isInitialized: false,
  },
  auth: {
    isLoggedIn: false,
  },
}

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as AppRootState & undefined,
  applyMiddleware(thunk),
)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
