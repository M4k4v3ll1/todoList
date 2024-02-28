import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action('Status changed')
const removeTaskStatusCallback = action('Task removed')
const changeTaskTitleallback = action('Title changed')
export const TaskExample = () => {
    return (
        <>
        <Task
            task={{id: '1', title: 'CSS', isDone: false}}
            todoListID={'todoListID1'}
            removeTasks={removeTaskStatusCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleallback}
        />
            <Task
            task={{id: '2', title: 'React', isDone: true}}
            todoListID={'todoListID2'}
            removeTasks={removeTaskStatusCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleallback}
        />
        </>
    )}