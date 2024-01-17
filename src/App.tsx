import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";
import {addTaskAC, changeStatusAC, removeTasksAC, taskReducer} from "./redusers/tasksReducer";
import {changeFilterAC, filterReducer} from "./redusers/filterReducer";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    //BLL
    const todoListTitle_1 = "What to learn"
    /*const todoListTitle_2 = "Songs"*/

    //state
    /*const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]*/

    const [tasks, dispatchTasks] = useReducer(taskReducer, [      //initial state
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true}
    ])
    const [filter, dispatchFilter] = useReducer(filterReducer, 'All')
    /*//Создаем функцию удаление задач на nativeJS, которая через onClick по кнопке будет принимать id таски.
    function removeTask(taskId: number) {
        //Создаем новый пустой массив nextState
        const nextState: Array<TaskPropsType> = []
        //Через пропсы у функции получаем taskId и прогоняем через цикл. Внутри цикла пишем условие, что если id в массиве tasks не совпадает с пришедшей через пропсы taskId, то пушим таску в новый массив nextState, а если совпадает, то ничего не делаем (как бы удаляя ее из нового массива).
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== taskId) {
                nextState. push(tasks[i])
            }
        }*/

    //Создаем функцию удаления задач на .filter, которая через onClick по кнопке будет принимать id таски.
    function removeTasks(id: string) {
        dispatchTasks(removeTasksAC(id))
    }

    function addTask(title: string) {
        dispatchTasks(addTaskAC(title))
    }

    function changeStatus(id: string, isDone: boolean) {
        dispatchTasks(changeStatusAC(id, isDone))
    }

    function changeFilter(value: FilterValuesType) {
        dispatchFilter(changeFilterAC(value))
    }

    let tasksForTodoList = tasks
    if (filter === 'Completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    } else if (filter === 'Active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    //UI
    return (
        <div className="App">
            <Todolist title={todoListTitle_1}
                      tasks={tasksForTodoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
