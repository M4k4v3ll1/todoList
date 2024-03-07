import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, TodoListDomainType, todoListsReducer} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";

test('IDs of tasks and todolists should be equal', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistsState:TodoListDomainType[] = []
    const action = addTodoListAC('newTodolist')
    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)
    const keys = Object.keys(endTaskState)
    const IDFromTasks = keys[0]
    const IDFromTodolists = endTodolistsState[0].todoListID

    expect(IDFromTasks).toBe(action.todoListID)
    expect(IDFromTodolists).toBe(action.todoListID)
    expect(IDFromTodolists).toEqual(IDFromTasks)
})
