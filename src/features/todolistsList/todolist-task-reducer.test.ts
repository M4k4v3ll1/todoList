import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodoListAC, TodoListDomainType, todoListsReducer} from "./todolists-reducer";

test('IDs of tasks and todolists should be equal', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistsState:TodoListDomainType[] = []
    const newTodoList: TodoListDomainType = {id: '123', title: '', filter: 'all', entityStatus: "idle", addedData: new Date(), order: 0}
    const action = addTodoListAC(newTodoList, 'newTodolist')
    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)
    const keys = Object.keys(endTaskState)
    const IDFromTasks = keys[0]
    const IDFromTodolists = endTodolistsState[0].id

    expect(IDFromTasks).toBe(action.todoList.id)
    expect(IDFromTodolists).toBe(action.todoList.id)
    expect(IDFromTodolists).toEqual(IDFromTasks)
})
