import React, {FC, useRef} from 'react';
import {ButtonComponent} from "./button/ButtonComponent";
import {FilterValuesType} from "../state/todolists-reducer";
import {TaskStatuses} from "../api/todolists-api";


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
    status: TaskStatuses
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
             <ButtonComponent name={'x'} onClickHandler={onClickRemoveTask} />
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
                    <li><input type="checkbox" checked={t.status === TaskStatuses.Completed}/>
                        <span>{t.title}</span>
                        <ButtonComponent name={'x'}
                                         onClick={removeTask}
                        />
                    </li>
                </>
            })}
        </ul>

    const taskTitleInput = useRef<HTMLInputElement>(null)

    const onClickAddTask = () => {
        if (taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value
            addTask(newTaskTitle)
            taskTitleInput.current.value = ''
        }
    }
    return <div>
        <h3>{title}</h3>
        <div>
            <input ref={taskTitleInput}/>
            <ButtonComponent name={'+'} onClick={onClickAddTask}/>
            {listItem}
            <ButtonComponent name={'All'} onClick={() => changeFilter('all')}/>
            <ButtonComponent name={'active'} onClick={() => changeFilter('active')}/>
            <ButtonComponent name={'completed'} onClick={() => changeFilter('completed')}/>
        </div>
    </div>
}