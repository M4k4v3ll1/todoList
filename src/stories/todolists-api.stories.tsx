import React, { useEffect, useState } from "react"
import { todolistsApi } from "features/todolistsList/api/todolists/todolistsApi"
import { tasksApi } from "features/todolistsList/api/tasks/tasksApi"

export default {
  title: "API",
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    todolistsApi.getTodoLists().then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>("")

  const createToDo = () => {
    todolistsApi.createTodoList(title).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"TodoList title"}
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }}
      />
      <button onClick={createToDo}>Create todoList</button>
    </div>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todoListID, setTodoListID] = useState<string>("")
  const deleteToDo = () => {
    todolistsApi.deleteTodoList(todoListID).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"TodoListID"}
        value={todoListID}
        onChange={(e) => {
          setTodoListID(e.currentTarget.value)
        }}
      />
      <button onClick={deleteToDo}>Delete todoList</button>
    </div>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todoListID, setTodoListID] = useState<string>("")
  const [todoListTitle, setTodoListTitle] = useState<string>("")
  const updateToDo = () => {
    todolistsApi.updateTodoList(todoListID, todoListTitle).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"TodoList ID"}
        value={todoListID}
        onChange={(e) => {
          setTodoListID(e.currentTarget.value)
        }}
      />
      <input
        placeholder={"TodoList title"}
        value={todoListTitle}
        onChange={(e) => {
          setTodoListTitle(e.currentTarget.value)
        }}
      />
      <button onClick={updateToDo}>Update todoList title</button>
    </div>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoListID, setTodoListID] = useState<string>("")
  const getTasks = () => {
    tasksApi.getTasks(todoListID).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"TodoList ID"}
        value={todoListID}
        onChange={(e) => {
          setTodoListID(e.currentTarget.value)
        }}
      />
      <button onClick={getTasks}>Get tasks</button>
    </div>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todoListID, setTodoListID] = useState<string>("")
  const [taskTitle, setTaskTitle] = useState<string>("")
  const createTask = () => {
    tasksApi.createTask({ todoListID, taskTitle }).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"TodoList ID"}
        value={todoListID}
        onChange={(e) => {
          setTodoListID(e.currentTarget.value)
        }}
      />
      <input
        placeholder={"Task title"}
        value={taskTitle}
        onChange={(e) => {
          setTaskTitle(e.currentTarget.value)
        }}
      />
      <button onClick={createTask}>Create task</button>
    </div>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todoListID, setTodoListID] = useState<string>("")
  const [taskID, setTaskID] = useState<string>("")
  useEffect(() => {}, [])
  const deleteTask = () => {
    tasksApi.deleteTask(todoListID, taskID).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder="todoListID"
        value={todoListID}
        onChange={(e) => {
          setTodoListID(e.currentTarget.value)
        }}
      />
      <input
        placeholder="taskID"
        value={taskID}
        onChange={(e) => {
          setTaskID(e.currentTarget.value)
        }}
      />
      <button onClick={deleteTask}>Delete task</button>
    </div>
  )
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todoListID, setTodoListID] = useState<string>("")
  const [taskID, setTaskID] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [order, setOrder] = useState<number>(0)
  const updateTask = () => {
    tasksApi
      .updateTask(todoListID, taskID, {
        description: description,
        title: title,
        status: status,
        priority: priority,
        startDate: startDate,
        deadline: deadline,
        order: order,
      })
      .then((res) => {
        setState(res.data)
      })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"TodoList ID"}
        value={todoListID}
        onChange={(e) => {
          setTodoListID(e.currentTarget.value)
        }}
      />
      <input
        placeholder={"Task ID"}
        value={taskID}
        onChange={(e) => {
          setTaskID(e.currentTarget.value)
        }}
      />
      <input
        placeholder={"Description"}
        value={description}
        onChange={(e) => {
          setDescription(e.currentTarget.value)
        }}
      />
      <input
        placeholder={"Task title"}
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }}
      />
      <input
        placeholder={"Status"}
        value={status}
        onChange={(e) => {
          setStatus(+e.currentTarget.value)
        }}
      />
      <input
        placeholder={"Priority"}
        value={priority}
        onChange={(e) => {
          setPriority(+e.currentTarget.value)
        }}
      />
      <div>
        <div>Start date</div>
        <input
          type={"date"}
          onChange={(e) => {
            setStartDate(new Date(e.currentTarget.value))
          }}
        />
      </div>
      <div>
        <div>Deadline</div>
        <input
          type={"date"}
          onChange={(e) => {
            setDeadline(new Date(e.currentTarget.value))
          }}
        />
      </div>
      <input
        placeholder={"Order"}
        value={order}
        onChange={(e) => {
          setOrder(+e.currentTarget.value)
        }}
      />
      <button onClick={updateTask}>Update task title</button>
    </div>
  )
}
