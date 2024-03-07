import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    //BLL
    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, dispatchToTodoListReducer] = useReducer(todoListsReducer, [
        {todoListID: todoListID1, title: 'What to learn', filter: 'all', addedData: new Date(), order: 0},
        {todoListID: todoListID2, title: 'What to buy', filter: 'all', addedData: new Date(), order: 0}
    ])

    let [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {todoListId: todoListID1, id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: v1(), title: "JS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: v1(), title: "ReactJS", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: v1(), title: "Rest API", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID1, id: v1(), title: "GraphQL", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
        ],
        [todoListID2]: [
            {todoListId: todoListID2, id: v1(), title: "Book", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Middle, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID2, id: v1(), title: "Milk", status: TaskStatuses.InProgress, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
            {todoListId: todoListID2, id: v1(), title: "Tea", status: TaskStatuses.New, description: '', priority: TaskPriorities.High, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0},
        ]
    });

    function removeTasks(todoListID: string, taskID: string) {
        dispatchToTaskReducer(removeTaskAC(todoListID, taskID))
    }

    function addTask(todoListID: string, newTaskTitle: string) {
        dispatchToTaskReducer(addTaskAC(todoListID, newTaskTitle))
    }

    function changeTaskStatus(todoListID: string, id: string, status: TaskStatuses) {
        dispatchToTaskReducer(changeTaskStatusAC(todoListID, id, status))
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        dispatchToTodoListReducer(changeTodoListFilterAC(todoListID, value))
    }

    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatchToTodoListReducer(action)
        dispatchToTaskReducer(action)
    }

    function addTodoList(todoListTitle: string) {
        let action = addTodoListAC(todoListTitle)
        dispatchToTodoListReducer(action)
        dispatchToTaskReducer(action)
    }

    function changeTaskTitle(todoListID: string, id: string, newValue: string) {
        dispatchToTaskReducer(changeTaskTitleAC(todoListID, id, newValue))
    }

    function changeTodoListTitle(todoListID: string, newTodoListTitle: string) {
        dispatchToTodoListReducer(changeTodoListTitleAC(todoListID, newTodoListTitle))
    }

    //UI
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(el => {
                        let tasksForTodoList = tasks[el.todoListID]
                        if (el.filter === 'completed') {
                            tasksForTodoList = tasks[el.todoListID].filter(t => t.status === TaskStatuses.Completed)
                        }
                        if (el.filter === 'active') {
                            tasksForTodoList = tasks[el.todoListID].filter(t => t.status === TaskStatuses.New)
                        }
                        return (<Grid item>
                            <Paper style={ {padding: '10px'}}>
                                <Todolist
                                    key={el.todoListID}
                                    todoListID={el.todoListID}
                                    title={el.title}
                                    tasks={tasksForTodoList}
                                    removeTasks={removeTasks}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                    filter={el.filter}
                                    removeTodoList={removeTodoList}
                                />
                            </Paper>
                        </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
