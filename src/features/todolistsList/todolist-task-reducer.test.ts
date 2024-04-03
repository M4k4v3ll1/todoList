import { tasksReducer, TasksStateType } from "features/todolistsList/tasksSlice"
import { TodoListDomainType, todolistsActions, todoListsReducer } from "features/todolistsList/todolistsSlice"

test("IDs of tasks and todolists should be equal", () => {
  const startTaskState: TasksStateType = {}
  const startTodolistsState: TodoListDomainType[] = []
  const newTodoList: TodoListDomainType = {
    id: "123",
    title: "",
    filter: "all",
    entityStatus: "idle",
    addedData: new Date(),
    order: 0,
  }
  const action = todolistsActions.addTodoList({ todoList: newTodoList, title: "newTodolist" })
  const endTaskState = tasksReducer(startTaskState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)
  const keys = Object.keys(endTaskState)
  const IDFromTasks = keys[0]
  const IDFromTodolists = endTodolistsState[0].id

  expect(IDFromTasks).toBe(action.payload.todoList.id)
  expect(IDFromTodolists).toBe(action.payload.todoList.id)
  expect(IDFromTodolists).toEqual(IDFromTasks)
})
