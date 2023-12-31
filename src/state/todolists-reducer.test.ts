import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, todoListsType} from '../App'

test('correct todolist should be removed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: todoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);
});

test('correct todolist should be added', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const newTodoListTitle = 'New TodoList'

    const startState: todoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct title of todolist should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const newTodoListTitle = 'New TodoList'

    const startState: todoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]

    const action = ChangeTodoListTitleAC(todoListID2, newTodoListTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const newFilter: FilterValuesType = 'completed'

    const startState: todoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]

    const action = ChangeTodoListFilterAC(todoListID2, newFilter)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});