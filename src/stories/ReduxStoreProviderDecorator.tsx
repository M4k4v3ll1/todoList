import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from '../state/tasks-reducer';
import {todoListsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {AppRootState} from "../state/store";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {todoListID: 'todoListID1', title: 'What to learn', filter: 'all', addedData: new Date(), order: 0},
        {todoListID: 'todoListID2', title: 'What to buy', filter: 'all', addedData: new Date(), order: 0}
    ],
    tasks: {
        ['todoListID1']: [
            {todoListId: 'todoListID1', id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: 'todoListID1', id: v1(), title: "JS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: 'todoListID1', id: v1(), title: "ReactJS", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: 'todoListID1', id: v1(), title: "Rest API", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: 'todoListID1', id: v1(), title: "GraphQL", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
        ],
        ['todoListID2']: [
            {todoListId: 'todoListID2', id: v1(), title: "Book", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Middle, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: 'todoListID2', id: v1(), title: "Milk", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: 'todoListID2', id: v1(), title: "Tea", status: TaskStatuses.New, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState & undefined);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}