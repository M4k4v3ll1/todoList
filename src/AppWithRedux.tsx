import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist'
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    FilterValuesType,
    getTodoListsTC,
    TodoListDomainType
} from "./state/todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {useAppDispatch, useAppSelector} from './state/store';
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<TasksStateType>( state => state.tasks)
    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [])
    const removeTasks = useCallback((todoListID: string, taskID: string) => {
        dispatch(deleteTaskTC(todoListID, taskID))
    }, [dispatch])
    const addTask = useCallback((todoListID: string, newTaskTitle: string) => {
        dispatch(addTaskTC(todoListID, newTaskTitle))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListID: string, id: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListID, id, {status}))
    }, [dispatch])
    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoListTC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodoListTC(todoListTitle))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, id: string, newValue: string) => {
        dispatch(updateTaskTC(todoListID, id, {title: newValue}))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, newTodoListTitle: string) => {
        dispatch(changeTodoListTitleTC(todoListID, newTodoListTitle))
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
