import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC, todoListID1, todoListID2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        [todoListID1]: [
            {todoListId: todoListID1, id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: '2', title: "JS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: '3', title: "ReactJS", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: '4', title: "Rest API", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: '5', title: "GraphQL", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
        ],
        [todoListID2]: [
            {todoListId: todoListID2, id: '1', title: "Book", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Middle, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID2, id: '2', title: "Milk", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID2, id: '3', title: "Tea", status: TaskStatuses.New, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
        ]
    }
})

test('correct task should be removed from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC(todoListID1, '1'))

    expect(endState[todoListID1].length).toBe(4);
    expect(endState[todoListID1][0].title).toBe("JS");
    expect(endState[todoListID2].length).toBe(3);
    expect(endState[todoListID2][0].title).toBe("Book");
    expect(endState[todoListID1].every(el => el.id !== '1')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC(todoListID2, 'Sugar'))

    expect(endState[todoListID1].length).toBe(5);
    expect(endState[todoListID2].length).toBe(4);
    expect(endState[todoListID2][0].id).toBeDefined();
    expect(endState[todoListID2][0].title).toBe("Sugar");
    expect(endState[todoListID2][0].status).toBe(0);
});

test('correct task should change its status', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC(todoListID1, '3', 2))

    expect(endState[todoListID1].length).toBe(5);
    expect(endState[todoListID2].length).toBe(3);
    expect(endState[todoListID1][2].status).toBe(2);
});

test('correct task title in correct todoList should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC(todoListID1, '3', 'ReactTS'))

    expect(endState[todoListID1].length).toBe(5);
    expect(endState[todoListID2].length).toBe(3);
    expect(endState[todoListID1][2].title).toBe('ReactTS');
    expect(endState[todoListID2][2].title).toBe('Tea');
});

test('new property with empty task array should be added when new todolist was added', () => {
    const endState = tasksReducer(startState, addTodoListAC('title no matter'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todoListID1 && k !== todoListID2)
    if (!newKey) {
        throw Error('New key should be added')
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('property with todoListID should be deleted', () => {
    const endState = tasksReducer(startState, removeTodoListAC(todoListID2))
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todoListID2]).toBeUndefined();
})