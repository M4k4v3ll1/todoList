import React, {FC, useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    FilterValuesType,
    getTodoListsTC,
    TodoListDomainType
} from "./todolists-reducer";
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api"
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";

export const TodoListsList: FC = () => {
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
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
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(el => {
                    return (<Grid key={el.id} item>
                        <Paper style={{padding: '10px'}}>
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
        </>
    )
}