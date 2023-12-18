import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Button} from "./button/Button";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm: FC<AddItemFormPropsType> = (
    {
        addItem
    }
) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem(newTaskTitle);
            setNewTaskTitle('');
        }
    }
    return <div>
        <input
            className={error ? 'error' : ''}
            value={newTaskTitle}
            onChange={onChangeNewTitleHandler}
            onKeyPress={onKeyPressAddTaskHandler}
        />
        <Button
            name={'+'}
            onClick={onClickAddTaskHandler}
        />
        {error && <div className='error_message'>{error}</div>}
    </div>
}