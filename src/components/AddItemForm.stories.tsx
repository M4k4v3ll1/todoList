import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Meta, StoryObj} from "@storybook/react";
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm Component',
    component: AddItemForm,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    }
}

const callback = action('Button "add" was pressed inside the form')
export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: FC<AddItemFormPropsType> = memo((
    {
        addItem
    }
) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')
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
})

export const AddItemFormWithErrorStory: Story = {
    render: () => <AddItemFormStory addItem={action('Button clicked inside form')}/>
}