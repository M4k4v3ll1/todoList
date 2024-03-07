import React, {FC} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {SuperCheckbox} from "./SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {AppRootState} from "../state/store";
import {TaskStatuses} from "../api/todolists-api";
import {TasksStateType} from "../App";


export type TodoListPropsType = {
    todoListID: string
    title: string
    // tasks: Array<TaskType>
    // removeTasks: (todoListID: string, id: string) => void
    // changeFilter: (todoListID: string, value: FilterValuesType) => void
    // addTask: (todoListID: string, newTaskTitle: string) => void
    // changeTaskStatus: (todoListID: string, id: string, status: TaskStatuses) => void
    // changeTaskTitle: (todoListID: string, id: string, newValue: string) => void
    // changeTodoListTitle: (todoListID: string, todoListTitle: string) => void
    filter: FilterValuesType
    // removeTodoList: (todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
}

// В props сразу делаем деструктурирующее присваивание: вместо (props) сразу делаем ({title, tasks}). И в дальнейшем не нужно писать props.title, а сразу title
export const TodolistRedux: FC<TodoListPropsType> = (
    {
        todoListID,
        title,
        filter
    }) => {
    let dispatch = useDispatch()
    let tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    let tasksForTodoList = tasks[todoListID]
    if (filter === 'completed') {
        tasksForTodoList = tasks[todoListID].filter(t => t.status === TaskStatuses.Completed)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks[todoListID].filter(t => t.status === TaskStatuses.New)
    }

    const onClickAllHandler = () => dispatch(changeTodoListFilterAC(todoListID, 'all'))
    const onClickActiveHandler = () => dispatch(changeTodoListFilterAC(todoListID, 'active'))
    const onClickCompletedHandler = () => dispatch(changeTodoListFilterAC(todoListID, 'completed'))
    const onClickRemoveTodoListHandler = () => {
        dispatch(removeTodoListAC(todoListID))
    }
    const changeTodoListTitleHandler = (newTodoListTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListID, newTodoListTitle))
    }
    const addItem = (newTaskTitle: string) => {
        dispatch(addTaskAC(todoListID, newTaskTitle))
    }
    const onChangeStatusHandler = (taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todoListID, taskID, status))
    }

    const listItem: JSX.Element = tasksForTodoList.length === 0 ?
        <div>Please add task</div>
        : <div> {
            tasksForTodoList.map((t) => {
                const onRemoveTaskHandler = () => dispatch(removeTaskAC(todoListID, t.id))
                const onChangeTitleHandler = (newValue: string) => {
                    dispatch(changeTaskTitleAC(todoListID, t.id, newValue))
                }
                return <div key={t.id}>

                    <SuperCheckbox
                        callback={() => onChangeStatusHandler(t.id, status ? TaskStatuses.Completed : TaskStatuses.New)}
                        checked={t.status === TaskStatuses.Completed}
                    />
                    <EditableSpan
                        title={t.title}
                        isDone={t.status === TaskStatuses.Completed}
                        onChange={onChangeTitleHandler}
                    />
                    <IconButton onClick={onRemoveTaskHandler}>
                        <Delete/>
                    </IconButton>
                </div>
            })}
        </div>

    return <div>
        <h3>
            <EditableSpan
                title={title}
                onChange={changeTodoListTitleHandler}
            />
            <IconButton onClick={onClickRemoveTodoListHandler}>
                <Delete/>
            </IconButton>
        </h3>

        <div>
            <AddItemForm addItem={addItem}/>
            {listItem}
            <Button
                variant={filter === 'all' ? 'contained' : 'text'}
                name={'All'}
                onClick={onClickAllHandler}>All</Button>
            <Button
                variant={filter === 'active' ? 'contained' : 'text'}
                name={'active'}
                onClick={onClickActiveHandler}>Active</Button>
            <Button
                variant={filter === 'completed' ? 'contained' : 'text'}
                name={'completed'}
                onClick={onClickCompletedHandler}>Completed</Button>
        </div>
    </div>
}

