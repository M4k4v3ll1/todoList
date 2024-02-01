import React, {FC} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {SuperCheckbox} from "./SuperCheckbox";


export type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, newTaskTitle: string) => void
    changeTaskStatus: (todoListID: string, id: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, id: string, newValue: string) => void
    changeTodoListTitle: (todoListID: string, todoListTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

// В props сразу делаем деструктурирующее присваивание: вместо (props) сразу делаем ({title, tasks}). И в дальнейшем не нужно писать props.title, а сразу title
export const Todolist: FC<TodoListPropsType> = (
    {
        todoListID,
        title,
        tasks,
        removeTasks,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTodoListTitle,
        filter,
        removeTodoList
    }) => {

    const onClickAllHandler = () => changeFilter(todoListID, 'all')
    const onClickActiveHandler = () => changeFilter(todoListID, 'active')
    const onClickCompletedHandler = () => changeFilter(todoListID, 'completed')
    const onClickRemoveTodoListHandler = () => {
        removeTodoList(todoListID)
    }
    const changeTodoListTitleHandler = (newTodoListTitle: string) => {
        changeTodoListTitle(todoListID, newTodoListTitle)
    }
    const addItem = (newTaskTitle: string) => {
        addTask(todoListID, newTaskTitle)
    }
    const onChangeStatusHandler = (taskID: string, checked: boolean) => {
        changeTaskStatus(todoListID, taskID, checked)
    }

    const listItem: JSX.Element = tasks.length === 0 ?
        <div>Please add task</div>
        : <div> {
            tasks.map((t) => {
                const onRemoveTaskHandler = () => removeTasks(todoListID, t.id)
                const onChangeTitleHandler = (newValue: string) => {
                    changeTaskTitle(todoListID, t.id, newValue)
                }
                return <div key={t.id}>

                    <SuperCheckbox
                        callback={(checked) => onChangeStatusHandler(t.id, checked)}
                        checked={t.isDone}
                    />
                    <EditableSpan
                        title={t.title}
                        isDone={t.isDone}
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

