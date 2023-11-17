import React, {FC} from 'react';
import {Button} from "./button/Button";
import {FilterValuesType} from "../App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTasks: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

// В props сразу делаем деструктурирующее присваивание: вместо (props) сразу делаем ({title, tasks}). И в дальнейшем не нужно писать props.title, а сразу title
export const Todolist: FC<TodoListPropsType> = ({title, tasks, removeTasks, changeFilter}) => {
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

    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <Button name={'+'}/>
            {listItem}
            <Button name={'All'} onClick={() => changeFilter('All')}/>
            <Button name={'Active'} onClick={() => changeFilter('Active')}/>
            <Button name={'Completed'} onClick={() => changeFilter('Completed')}/>
        </div>
    </div>
}