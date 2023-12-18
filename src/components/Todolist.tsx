import React, {ChangeEvent, FC} from 'react';
import {Button} from "./button/Button";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

    const listItem: JSX.Element = tasks.length === 0 ?
        <div>Please add task</div>
        : <ul> {
            tasks.map((t) => {
                const onRemoveTaskHandler = () => removeTasks(todoListID, t.id)
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(todoListID, t.id, e.currentTarget.checked)
                }
                const onChangeTitleHandler = (newValue: string) => {
                    changeTaskTitle(todoListID, t.id, newValue)
                }
                return <li key={t.id}>
                    <input
                        type="checkbox"
                        onChange={onChangeStatusHandler}
                        checked={t.isDone}
                    />
                    <EditableSpan
                        title={t.title}
                        isDone={t.isDone}
                        onChange={onChangeTitleHandler}
                    />
                    <Button name={'x'}
                            onClick={onRemoveTaskHandler}
                    />
                </li>
            })}
        </ul>
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

    return <div>
        <h3>
            <EditableSpan
                title={title}
                onChange={changeTodoListTitleHandler}
            />
            <button onClick={onClickRemoveTodoListHandler}>x</button>
        </h3>

        <div>
            <AddItemForm addItem={addItem}/>
            {listItem}
            <Button
                className={filter === 'all' ? 'active_filter' : ''}
                name={'All'}
                onClick={onClickAllHandler}/>
            <Button
                className={filter === 'active' ? 'active_filter' : ''}
                name={'active'}
                onClick={onClickActiveHandler}/>
            <Button
                className={filter === 'completed' ? 'active_filter' : ''}
                name={'completed'}
                onClick={onClickCompletedHandler}/>
        </div>
    </div>
}

