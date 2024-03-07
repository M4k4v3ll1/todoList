import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, setTodoListsAC, TodoListDomainType,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todoListID1: string
let todoListID2: string
let startState: TodoListDomainType[]

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        {todoListID: todoListID1, title: 'What to learn', filter: 'all', addedData: new Date(), order: 0},
        {todoListID: todoListID2, title: 'What to buy', filter: 'all', addedData: new Date(), order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1);
    expect(endState[0].todoListID).toBe(todoListID2);
});

test('correct todolist should be added', () => {
    const newTodoListTitle = 'New TodoList'
    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct title of todolist should be changed', () => {
    const newTodoListTitle = 'New TodoList'
    const action = changeTodoListTitleAC(todoListID2, newTodoListTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'completed'
    const action = changeTodoListFilterAC(todoListID2, newFilter)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todoLists should be set to the state', () => {
    const action = setTodoListsAC(startState)

    const endState = todoListsReducer([], action)

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].filter).toBe('all');
});