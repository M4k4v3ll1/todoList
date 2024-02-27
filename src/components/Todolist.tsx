import React, {FC, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonProps, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";


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
export const Todolist: FC<TodoListPropsType> = memo((
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
    console.log('TodoList is called')
    const onClickAllHandler = useCallback(() => changeFilter(todoListID, 'all'), [changeFilter, todoListID])
    const onClickActiveHandler = useCallback(() => changeFilter(todoListID, 'active'), [changeFilter, todoListID])
    const onClickCompletedHandler = useCallback(() => changeFilter(todoListID, 'completed'), [changeFilter, todoListID])
    const onClickRemoveTodoListHandler = () => {
        removeTodoList(todoListID)
    }
    const changeTodoListTitleHandler = useCallback((newTodoListTitle: string) => {
        changeTodoListTitle(todoListID, newTodoListTitle)
    }, [changeTodoListTitle, todoListID])
    const addItem = useCallback((newTaskTitle: string) => {
        addTask(todoListID, newTaskTitle)
    }, [addTask, todoListID])
    const onChangeStatusHandler = useCallback((taskID: string, checked: boolean) => {
        changeTaskStatus(todoListID, taskID, checked)
    }, [changeTaskStatus, todoListID])
    let filteredTasks = tasks

    filteredTasks = useMemo(() => {
        console.log('useMemo')
        if (filter === 'active') {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if (filter === 'completed') {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }
        return filteredTasks
    }, [filter, tasks])
    const listItem: JSX.Element = filteredTasks.length === 0 ?
        <div>Please add task</div>
        : <div> {
            filteredTasks.map((t) => {
                return <Task
                    key={t.id}
                    task={t}
                    todoListID={todoListID}
                    removeTasks={removeTasks}
                    changeTaskStatus={onChangeStatusHandler}
                    changeTaskTitle={changeTaskTitle}
                    />

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
            <MyButton variant={filter === 'all' ? 'contained' : 'text'} name={'all'} onClick={onClickAllHandler}/>
            <MyButton variant={filter === 'active' ? 'contained' : 'text'} name={'active'} onClick={onClickActiveHandler}/>
            <MyButton variant={filter === 'completed' ? 'contained' : 'text'} name={'completed'} onClick={onClickCompletedHandler}/>
        </div>
    </div>
})

interface IMyButton extends ButtonProps {
}

const MyButton: FC<IMyButton> = memo(({
                                     variant,
                                     name,
                                     onClick
                                 }) => {
    return (<Button
        variant={variant}
        name={name}
        onClick={onClick}
        >
            {name}
    </Button>
    )
})