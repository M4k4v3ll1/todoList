import React, {FC} from 'react';
import {TaskPropsType} from "../../Todolist";

export const Task:FC<TaskPropsType> = (tasks) => {
    return (
        <li>
            <input type="checkbox" checked={tasks.isDone}/> <span>{tasks.title}</span>
        </li>
    );
};
