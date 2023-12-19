import {todoListsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {todoListsType} from '../App'

test('correct todolist should be removed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: todoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, {
        type: 'REMOVE-TODOLIST',
        id: todoListID1
    })

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

    const endState = todoListsReducer(startState, {
        type: 'ADD-TODOLIST',
        title: newTodoListTitle
    })

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const newTodoListTitle = 'New TodoList'

    const startState: todoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todoListID2,
        title: newTodoListTitle
    }


    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});