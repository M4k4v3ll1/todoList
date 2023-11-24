import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from './components/Todolist';
import {v1} from "uuid";
import {logDOM} from "@testing-library/react";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    //BLL
    const todoListTitle_1 = "What to learn"
    /*const todoListTitle_2 = "Songs"*/

    //state

    const [tasks, setTasks] = useState<Array<TaskPropsType>>([      //init ial state
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')
    /*//Создаем функцию удаление задач на nativeJS, которая через onClick по кнопке будет принимать id таски.
    function removeTask(taskId: number) {
        //Создаем новый пустой массив nextState
        const nextState: Array<TaskPropsType> = []
        //Через пропсы у функции получаем taskId и прогоняем через цикл. Внутри цикла пишем условие, что если id в массиве tasks не совпадает с пришедшей через пропсы taskId, то пушим таску в новый массив nextState, а если совпадает, то ничего не делаем (как бы удаляя ее из нового массива).
        for (let i = 0; i < tasks.lengtст {
                nextState. push(tasks[i])
            }
        }*/

    //Создаем функцию удаления задач на .filter, которая через onClick по кнопке будет принимать id таски.
    function removeTasks(id: string) {
        let nextState = tasks.filter(t => t.id !== id)
        //Через функцию setTasks хука useState пушим новый массив nextState
        setTasks(nextState)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks
    if (filter === 'Completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    } else if (filter === 'Active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }


    //create task
    const addTask = (title: string) => {
        const newTask: TaskPropsType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: Array<TaskPropsType> = [newTask, ...tasks]
        setTasks(nextState)
    }

    //UI
    return (
        <div className="App">
            <Todolist title={todoListTitle_1}
                      tasks={tasksForTodoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
