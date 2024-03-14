import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType, TodoListDomainType} from "./state/todolists-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListDomainType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all', addedData: new Date(), order: 0},
        {id: todoListID2, title: 'What to buy', filter: 'all', addedData: new Date(), order: 0}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }

    function addTask(todoListID: string, newTaskTitle: string) {
        let newTask: TaskType = {todoListId: todoListID, id: v1(), title: newTaskTitle, status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, addedDate: new Date(), startDate: new Date(), deadline: new Date(), order: 0}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(todoListID: string, id: string, status: TaskStatuses) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === id ? {...el, status: status} : el)})
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(todoListTitle: string) {
        let newTodoList: TodoListDomainType = {id: v1(), title: todoListTitle, filter: 'all', addedData: new Date(), order: 0}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    function changeTaskTitle(todoListID: string, id: string, newValue: string) {
        // debugger
        // let todoListTasks = tasks[todoListID]
        // let task = todoListTasks.find(el => el.id === id)
        // if (task) {
        //     task.title = newValue
        //     setTasks({...tasks})
        // }
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === id ? {...el, title: newValue} : el)})
    }

    function changeTodoListTitle(todoListID: string, newTodoListTitle: string) {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: newTodoListTitle} : el))
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
                            tasksForTodoList = tasks[el.id].filter(t => t.status === TaskStatuses.Completed)
                        }
                        if (el.filter === 'active') {
                            tasksForTodoList = tasks[el.id].filter(t => t.status === TaskStatuses.New)
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

export default App;
