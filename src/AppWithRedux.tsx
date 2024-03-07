import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './components/Todolist'
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, TodoListDomainType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootState } from './state/store';
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodoListDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks)

    const removeTasks = useCallback((todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }, [dispatch])
    const addTask = useCallback((todoListID: string, newTaskTitle: string) => {
        dispatch(addTaskAC(todoListID, newTaskTitle))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListID: string, id: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todoListID, id, status))
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
                        return (<Grid key={el.todoListID} item>
                            <Paper style={ {padding: '10px'}}>
                                <Todolist
                                    todoListID={el.todoListID}
                                    title={el.title}
                                    filter={el.filter}
                                    tasks={tasks[el.todoListID]}
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
