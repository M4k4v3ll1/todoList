import { tasksActions, tasksReducer, TasksStateType } from "features/todolistsList/tasksSlice"
import { TodoListDomainType, todoListID1, todoListID2, todolistsActions } from "features/todolistsList/todolistsSlice"
import { TaskPriorities, TaskStatuses } from "api/todolists-api"

let startState: TasksStateType

beforeEach(() => {
  startState = {
    [todoListID1]: [
      {
        todoListId: todoListID1,
        id: "1",
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
        todoListId: todoListID1,
        id: "2",
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
        todoListId: todoListID1,
        id: "3",
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
        todoListId: todoListID1,
        id: "4",
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
        todoListId: todoListID1,
        id: "5",
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
    [todoListID2]: [
      {
        todoListId: todoListID2,
        id: "1",
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
        todoListId: todoListID2,
        id: "2",
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
        todoListId: todoListID2,
        id: "3",
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
  }
})

test("correct task should be removed from correct array", () => {
  const endState = tasksReducer(startState, tasksActions.removeTask({ todoListID: todoListID1, taskID: "1" }))

  expect(endState[todoListID1].length).toBe(4)
  expect(endState[todoListID1][0].title).toBe("JS")
  expect(endState[todoListID2].length).toBe(3)
  expect(endState[todoListID2][0].title).toBe("Book")
  expect(endState[todoListID1].every((el) => el.id !== "1")).toBeTruthy()
})

test("correct task should be added to correct array", () => {
  const newTask = {
    todoListId: todoListID2,
    id: "1",
    title: "Book",
    status: TaskStatuses.Completed,
    description: "",
    priority: TaskPriorities.Middle,
    addedDate: new Date(),
    startDate: new Date(),
    deadline: new Date(),
    order: 0,
  }
  const endState = tasksReducer(startState, tasksActions.addTask({ task: newTask }))

  expect(endState[todoListID1].length).toBe(5)
  expect(endState[todoListID2].length).toBe(4)
  expect(endState[todoListID2][0].id).toBeDefined()
  expect(endState[todoListID2][0].title).toBe("Book")
  expect(endState[todoListID2][0].status).toBe(TaskStatuses.Completed)
})

test("correct task should change its status", () => {
  const model = { status: TaskStatuses.Completed }
  const endState = tasksReducer(startState, tasksActions.updateTask({ todoListID: todoListID1, taskID: "3", model }))

  expect(endState[todoListID1].length).toBe(5)
  expect(endState[todoListID2].length).toBe(3)
  expect(endState[todoListID1][2].status).toBe(TaskStatuses.Completed)
})

test("correct task title in correct todoList should be changed", () => {
  const endState = tasksReducer(
    startState,
    tasksActions.updateTask({ todoListID: todoListID1, taskID: "3", model: { title: "ReactTS" } }),
  )

  expect(endState[todoListID1].length).toBe(5)
  expect(endState[todoListID2].length).toBe(3)
  expect(endState[todoListID1][2].title).toBe("ReactTS")
  expect(endState[todoListID2][2].title).toBe("Tea")
})

test("new property with empty task array should be added when new todolist was added", () => {
  const newTodoList: TodoListDomainType = {
    id: "123",
    title: "",
    filter: "all",
    entityStatus: "idle",
    addedData: new Date(),
    order: 0,
  }
  const endState = tasksReducer(
    startState,
    todolistsActions.addTodoList({ todoList: newTodoList, title: "title no matter" }),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todoListID1 && k !== todoListID2)
  if (!newKey) {
    throw Error("New key should be added")
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toStrictEqual([])
})

test("property with todoListID should be deleted", () => {
  const endState = tasksReducer(startState, todolistsActions.removeTodoList({ id: todoListID2 }))
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todoListID2]).toBeUndefined()
})
test("empty array of tasks should be added in each todoList when we set todoLists", () => {
  const action = todolistsActions.setTodoLists({
    todoLists: [
      { id: todoListID1, title: "What to learn", addedData: new Date(), order: 0 },
      { id: todoListID2, title: "What to buy", addedData: new Date(), order: 0 },
    ],
  })
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState[todoListID1]).toStrictEqual([])
  expect(endState[todoListID2]).toStrictEqual([])
})

test("tasks should be added in todoList", () => {
  const action = tasksActions.setTasks({ todoListID: todoListID1, tasks: startState[todoListID1] })
  const endState = tasksReducer(
    {
      todoListID2: [],
      todoListID1: [],
    },
    action,
  )

  expect(endState[todoListID1].length).toBe(5)
})
