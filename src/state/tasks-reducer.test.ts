import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

test('correct task should be removed from correct array', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: TasksStateType = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC(todoListID1, '1'))

    expect(endState[todoListID1].length).toBe(4);
    expect(endState[todoListID1][0].title).toBe("JS");
    expect(endState[todoListID2].length).toBe(3);
    expect(endState[todoListID2][0].title).toBe("Book");
    expect(endState[todoListID1].every(el => el.id !== '1')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: TasksStateType = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, addTaskAC(todoListID2, 'Sugar'))

    expect(endState[todoListID1].length).toBe(5);
    expect(endState[todoListID2].length).toBe(4);
    expect(endState[todoListID2][0].id).toBeDefined();
    expect(endState[todoListID2][0].title).toBe("Sugar");
    expect(endState[todoListID2][0].isDone).toBe(false);
});

test('correct task should change its status', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: TasksStateType = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todoListID1, '3', true))

    expect(endState[todoListID1].length).toBe(5);
    expect(endState[todoListID2].length).toBe(3);
    expect(endState[todoListID1][2].isDone).toBeTruthy();
    expect(endState[todoListID2][2].isDone).toBeFalsy();
});

test('correct task title in correct todoList should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: TasksStateType = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todoListID1, '3', 'ReactTS'))

    expect(endState[todoListID1].length).toBe(5);
    expect(endState[todoListID2].length).toBe(3);
    expect(endState[todoListID1][2].title).toBe('ReactTS');
    expect(endState[todoListID2][2].title).toBe('Tea');
});

test('new property with empty task array should be added when new todolist was added', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, addTodoListAC('title no matter'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todoListID1' && k !== 'todoListID2')
    if (!newKey) {
        throw Error('New key should be added')
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('property with todoListID should be deleted', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, removeTodoListAC('todoListID2'))
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListID2']).toBeUndefined();
})