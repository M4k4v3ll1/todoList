import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

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
}