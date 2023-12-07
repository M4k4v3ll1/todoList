import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {Button} from "./button/Button";
import {FilterValuesType} from "../App";

export type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskPropsType>
    removeTasks: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, newTaskTitle: string) => void
    changeTaskStatus: (todoListID: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}

export type TaskPropsType = {
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
        filter,
        removeTodoList
    }) => {
    /* //Делаем список задач на NativeJS через цикл for
     //Создаем пустой массив listItems
     const listItems: Array<JSX.Element> = []
     //Создаем элемент listItem и прогоняем через цикл, получая количество <li> равное количеству элементов в изначальном массиве tasks_1, tasks_2
     for (let i = 0; i < tasks.length; i++) {
         debugger
         const onClickRemoveTask = () => removeTask(tasks[i].id)
         const listItem: JSX.Element = <li>
             <input type="checkbox" checked={tasks[i].isDone}/>
             <span>{tasks[i].title}</span>
             <Button name={'x'} onClickHandler={onClickRemoveTask} />
         </li>
         //Пушим в созданный ранее пустой массив
         listItems.push(listItem)
     }*/

    const listItem: JSX.Element = tasks.length === 0 ?
        <div>Please add task</div>
        : <ul> {
            tasks.map((t) => {
                const onRemoveTaskHandler = () => removeTasks(todoListID, t.id)
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(todoListID, t.id, e.currentTarget.checked)
                }
                return <li key={t.id}>
                    <input
                        type="checkbox"
                        onChange={onChangeStatusHandler}
                        checked={t.isDone}
                    />
                    <span className={t.isDone ? 'is_done' : ''}>{t.title}</span>
                    <Button name={'x'}
                            onClick={onRemoveTaskHandler}
                    />
                </li>
            })}
        </ul>

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(todoListID, newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask(todoListID, newTaskTitle);
            setNewTaskTitle('');
        }
    }
    const onClickAllHandler = () => changeFilter(todoListID, 'all')
    const onClickActiveHandler = () => changeFilter(todoListID, 'active')
    const onClickCompletedHandler = () => changeFilter(todoListID, 'completed')
    const onClickRemoveTodoListHandler = () => {
        removeTodoList(todoListID)
    }

    return <div>
        <h3>
            {title}
            <button onClick={onClickRemoveTodoListHandler}>x</button>
        </h3>

        <div>
            <input
                className={error ? 'error' : ''}
                value={newTaskTitle}
                onChange={onChangeNewTitleHandler}
                onKeyPress={onKeyPressAddTaskHandler}
            />
            <Button
                name={'+'}
                onClick={onClickAddTaskHandler}
            />
            {error && <div className='error_message'>{error}</div>}
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