import {TasksStateType, TodoListsType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, todoListsReducer} from "./todolists-reducer";

test('IDs of tasks and todolists should be equal', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistsState: TodoListsType[] = []
    const action = addTodoListAC('newTodolist')
    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)
    const keys = Object.keys(endTaskState)
    const IDFromTasks = keys[0]
    const IDFromTodolists = endTodolistsState[0].id

    expect(IDFromTasks).toBe(action.todoListID)
    expect(IDFromTodolists).toBe(action.todoListID)
    expect(IDFromTodolists).toEqual(IDFromTasks)
})
