import React, {ChangeEvent, FC, memo, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    title: string
    isDone?: boolean
    onChange: (newValue: string) => void
}
export const EditableSpan: FC<EditableSpanPropsType> = memo((
    {
        title,
        isDone,
        onChange
    }
) => {
    console.log('EditableSpan is called')
    const [editMode, setEditMode] = useState(false)
    const [inputTitle, setInputTitle] = useState('')
    const onClickActivateEditMode = () => {
        setEditMode(true)
        setInputTitle(title)
    }
    const onClickActivateViewMode = () => {
        setEditMode(false)
        onChange(inputTitle)
    }
    const onChangeChangeInputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                value={inputTitle}
                onBlur={onClickActivateViewMode}
                onChange={onChangeChangeInputTitleHandler}
                autoFocus/>
            : <span
                className={isDone ? 'is_done' : ''}
                onDoubleClick={onClickActivateEditMode}
            >{title}</span>
    )
})