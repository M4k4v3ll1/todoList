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
    removeTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootState } from './state/store';
import {TodolistRedux} from "./components/TodolistRedux";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodoListsType[]>( state => state.todoLists)
    // const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks)
    //
    // function removeTasks(todoListID: string, taskID: string) {
    //     dispatch(removeTaskAC(todoListID, taskID))
    // }
    // function addTask(todoListID: string, newTaskTitle: string) {
    //     dispatch(addTaskAC(todoListID, newTaskTitle))
    // }
    // function changeTaskStatus(todoListID: string, id: string, isDone: boolean) {
    //     dispatch(changeTaskStatusAC(todoListID, id, isDone))
    // }
    // function changeFilter(todoListID: string, value: FilterValuesType) {
    //     dispatch(changeTodoListFilterAC(todoListID, value))
    // }
    // function removeTodoList(todoListID: string) {
    //     dispatch(removeTodoListAC(todoListID))
    // }
    function addTodoList(todoListTitle: string) {
        dispatch(addTodoListAC(todoListTitle))
    }
    // function changeTaskTitle(todoListID: string, id: string, newValue: string) {
    //     dispatch(changeTaskTitleAC(todoListID, id, newValue))
    // }
    // function changeTodoListTitle(todoListID: string, newTodoListTitle: string) {
    //     dispatch(changeTodoListTitleAC(todoListID, newTodoListTitle))
    // }

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
                        return (<Grid item>
                            <Paper style={ {padding: '10px'}}>
                                <TodolistRedux
                                    todoListID={el.id}
                                    title={el.title}
                                    filter={el.filter}
                                />
                            </Paper>
                        </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
