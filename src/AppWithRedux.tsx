import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist'
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootState } from './state/store';

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
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks)

    const removeTasks = useCallback((todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }, [dispatch])
    const addTask = useCallback((todoListID: string, newTaskTitle: string) => {
        dispatch(addTaskAC(todoListID, newTaskTitle))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListID: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListID, id, isDone))
    }, [dispatch])
    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, id: string, newValue: string) => {
        dispatch(changeTaskTitleAC(todoListID, id, newValue))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, newTodoListTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListID, newTodoListTitle))
    }, [dispatch])


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
                        return (<Grid key={el.id} item>
                            <Paper style={ {padding: '10px'}}>
                                <Todolist
                                    todoListID={el.id}
                                    title={el.title}
                                    filter={el.filter}
                                    tasks={tasks[el.id]}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTasks={removeTasks}
                                    changeFilter={changeFilter}
                                    changeTodoListTitle={changeTodoListTitle}
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

export default AppWithRedux;
