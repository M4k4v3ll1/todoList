import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    //BLL
    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, dispatchToTodoListReducer] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Tea", isDone: false},
        ]
    });

    function removeTasks(todoListID: string, taskID: string) {
        dispatchToTaskReducer(removeTaskAC(todoListID, taskID))
    }

    function addTask(todoListID: string, newTaskTitle: string) {
        dispatchToTaskReducer(addTaskAC(todoListID, newTaskTitle))
    }

    function changeTaskStatus(todoListID: string, id: string, isDone: boolean) {
        dispatchToTaskReducer(changeTaskStatusAC(todoListID, id, isDone))
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
                        let tasksForTodoList = tasks[el.id]
                        if (el.filter === 'completed') {
                            tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                        }
                        if (el.filter === 'active') {
                            tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                        }
                        return (<Grid item>
                            <Paper style={ {padding: '10px'}}>
                                <Todolist
                                    key={el.id}
                                    todoListID={el.id}
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
