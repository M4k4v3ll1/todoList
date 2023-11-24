import React, {ChangeEvent, FC, useState} from 'react';
import {Button} from "./button/Button";
import {FilterValuesType} from "../App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

// В props сразу делаем деструктурирующее присваивание: вместо (props) сразу делаем ({title, tasks}). И в дальнейшем не нужно писать props.title, а сразу title
export const Todolist: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTasks,
        changeFilter,
        addTask
    }
) => {
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
                const removeTask = () => removeTasks(t.id)
                return <>
                    <li><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'x'}
                                onClick={removeTask}
                        />
                    </li>
                </>
            })}
        </ul>

    const [newTaskTitle, setTitle] = useState('')


    const onClickAddTask = () => {
        addTask(newTaskTitle)
        setTitle('')
    }

    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter'
        && Boolean(newTaskTitle)
        && newTaskTitle.length < 15
        && onClickAddTask()
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length <= 15) {setTitle(e.currentTarget.value)}
    }

    const maxTitleLengthError = newTaskTitle.length >= 15

    return <div>
        <h3>{title}</h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
            />
            <Button
                name={'+'}
                onClick={onClickAddTask}
                disabled={!newTaskTitle || maxTitleLengthError}
            />
            {maxTitleLengthError && <div style={{color: 'red'}}>Your tasktitle is too long. Use backspace ;)</div>}
            {listItem}
            <Button name={'All'} onClick={() => changeFilter('All')}/>
            <Button name={'Active'} onClick={() => changeFilter('Active')}/>
            <Button name={'Completed'} onClick={() => changeFilter('Completed')}/>
        </div>
    </div>
}