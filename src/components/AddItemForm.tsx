import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm: FC<AddItemFormPropsType> = memo((
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
        debugger
        if (error) {
            setError(null)
        }
        if (e.charCode === 13 && newTaskTitle.trim() !== '') {
            addItem(newTaskTitle);
            setNewTaskTitle('');
        } else if (e.charCode === 13 && newTaskTitle.trim() === '') {
            setError('Title is required')
        }
    }
    return <div>
        <TextField
            error={!!error}
            helperText={error}
            value={newTaskTitle}
            variant={'outlined'}
            label={'Add text'}
            onChange={onChangeNewTitleHandler}
            onKeyPress={onKeyPressAddTaskHandler}
        />
        <IconButton
            onClick={onClickAddTaskHandler}
        >
            <ControlPoint/>
        </IconButton>
    </div>
})