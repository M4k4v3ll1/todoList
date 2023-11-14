import React, {FC} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
}

type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

// В props сразу делаем деструктурирующее присваивание: вместо (props) сразу делаем ({title, tasks}). И в дальнейшем не нужно писать props.title, а сразу title
export const Todolist: FC<TodoListPropsType> = ({title, tasks}) => {
    //Делаем список задач на NativeJS через цикл for
    //Создаем пустой массив listItems
    const listItems: Array<JSX.Element> = []
    //Создаем элемент listItem и прогоняем через цикл, получая количество <li> равное количеству элекментов в изначальном массиве tasks_1, tasks_2
    for (let i = 0; i < tasks.length; i++) {
        const listItem: JSX.Element = <li>
            <input type="checkbox" checked={tasks[i].isDone}/> <span>{tasks[i].title}</span>
        </li>
        //Пушим в созданный ранее пустой массив
        listItems.push(listItem)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {/*Вывод массива из цикла for*/}
                {listItems}
                {/*Делаем список задач через метод .map*/}
                {/*{
                    tasks.map((t: TaskPropsType) => {
                        return <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>
                    })
                }*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
