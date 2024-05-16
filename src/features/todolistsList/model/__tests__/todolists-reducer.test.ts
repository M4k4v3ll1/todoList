import {
  FilterValuesType,
  TodoListDomainType,
  todoListsActions,
  todoListsReducer,
  todoListsThunks,
} from "features/todolistsList/model/todolists/todolistsSlice"
import { v1 } from "uuid"
import { ActionTypeForTests } from "common/types/ActionTypeForTests"

let todoListID1: string
let todoListID2: string
let startState: TodoListDomainType[]

beforeEach(() => {
  todoListID1 = v1()
  todoListID2 = v1()
  startState = [
    { id: todoListID1, title: "What to learn", filter: "all", entityStatus: "idle", addedData: new Date(), order: 0 },
    { id: todoListID2, title: "What to buy", filter: "all", entityStatus: "idle", addedData: new Date(), order: 0 },
  ]
})

test("correct todolist should be removed", () => {
  const action: ActionTypeForTests<typeof todoListsThunks.deleteTodoList.fulfilled> = {
    type: todoListsThunks.deleteTodoList.fulfilled.type,
    payload: { id: todoListID1 },
  }
  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListID2)
})

test("correct todolist should be added", () => {
  const newTodoList: TodoListDomainType = {
    id: "123",
    title: "",
    filter: "all",
    entityStatus: "idle",
    addedData: new Date(),
    order: 0,
  }
  const newTodoListTitle = "New TodoList"
  const action: ActionTypeForTests<typeof todoListsThunks.addTodoList.fulfilled> = {
    type: todoListsThunks.addTodoList.fulfilled.type,
    payload: { todoList: newTodoList, title: newTodoListTitle },
  }
  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodoListTitle)
  expect(endState[0].filter).toBe("all")
})

test("correct title of todolist should be changed", () => {
  const newTodoListTitle = "New TodoList"
  const action: ActionTypeForTests<typeof todoListsThunks.changeTodoListTitle.fulfilled> = {
    type: todoListsThunks.changeTodoListTitle.fulfilled.type,
    payload: { id: todoListID2, title: newTodoListTitle },
  }

  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New TodoList")
})

test("correct filter of todolist should be changed", () => {
  const newFilter: FilterValuesType = "completed"
  const action = todoListsActions.changeTodoListFilter({ id: todoListID2, filter: newFilter })

  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})

test("todoLists should be set to the state", () => {
  const action: ActionTypeForTests<typeof todoListsThunks.fetchTodoLists.fulfilled> = {
    type: todoListsThunks.fetchTodoLists.fulfilled.type,
    payload: { todoLists: startState },
  }

  const endState = todoListsReducer([], action)

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].filter).toBe("all")
})

test("correct entity status of todolist should be changed", () => {
  const endState = todoListsReducer(
    startState,
    todoListsActions.setTodoListEntityStatus({ id: todoListID2, status: "loading" }),
  )

  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe("loading")
})
