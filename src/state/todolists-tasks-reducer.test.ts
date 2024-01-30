import {TasksStateType, todoListsType} from "../App";
import {addTodoListAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('IDs in todoLists and tasks must be equal', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: todoListsType[] = []
    const action = addTodoListAC('new todoList')
    const endTaskState = tasksReducer(startTasksState, action)
    const endTodoListState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTaskState)
    const IDFromTasks = keys[0]
    const IDFromTodoLists = endTodoListState[0].id

    expect(IDFromTasks).toBe(action.todoListID);
    expect(IDFromTodoLists).toBe(action.todoListID);
})