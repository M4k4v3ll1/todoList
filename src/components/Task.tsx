import React, {FC, memo, useCallback} from 'react';
import {SuperCheckbox} from "./SuperCheckbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todoListID: string
    removeTasks: (todoListID: string, id: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, id: string, newValue: string) => void
}

export const Task: FC<TaskPropsType> = memo(({
                                                 task,
                                                 todoListID,
                                                 removeTasks,
                                                 changeTaskStatus,
                                                 changeTaskTitle
                                             }) => {
    const onRemoveTaskHandler = useCallback(() => removeTasks(todoListID, task.id), [removeTasks, todoListID, task])
    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(todoListID, task.id, newValue)
    }, [changeTaskTitle, task])
    const onChangeTaskStatusHandler = useCallback((checked: boolean) => {
        changeTaskStatus(task.id, checked)
    }, [changeTaskStatus, task])
    return (
        <div>
            <SuperCheckbox
                callback={onChangeTaskStatusHandler}
                checked={task.isDone}
            />
            <EditableSpan
                title={task.title}
                isDone={task.isDone}
                onChange={onChangeTitleHandler}
            />
            <IconButton onClick={onRemoveTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})
