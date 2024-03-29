import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ControlPoint from "@mui/icons-material/ControlPoint";

export type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
    disabled?: boolean
}
export const AddItemForm: FC<AddItemFormPropsType> = memo((
    {
        addItem,
        disabled = false
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
            disabled={disabled}
        />
        <IconButton
            onClick={onClickAddTaskHandler}
            disabled={disabled}
        >
            <ControlPoint/>
        </IconButton>
    </div>
})