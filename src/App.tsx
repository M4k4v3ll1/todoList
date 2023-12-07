import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    //BLL
    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<todoListsType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Tea", isDone: false},
        ]
    });

    function removeTasks(todoListID: string, taskID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }

    function addTask(todoListID: string, newTaskTitle: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(todoListID: string, id: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === id ? {...el, isDone: isDone} : el)})
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    //UI
    return (
        <div className="App">
            {todoLists.map(el => {
                let tasksForTodoList = tasks[el.id]
                if (el.filter === 'completed') {
                    tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                }
                if (el.filter === 'active') {
                    tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodoList}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
