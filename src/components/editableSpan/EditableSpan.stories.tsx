import { Meta, StoryObj } from "@storybook/react"
import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { EditableSpan } from "./EditableSpan"

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/EditableSpan Component",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
}
export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory = () => {
  const [editMode, setEditMode] = useState(false)
  const [inputTitle, setInputTitle] = useState("Editable Span")
  const isDone = true
  const onClickActivateEditMode = () => {
    setEditMode(true)
    setInputTitle(inputTitle)
  }
  const onClickActivateViewMode = () => {
    setEditMode(false)
    setInputTitle(inputTitle)
  }
  const onChangeChangeInputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
  }
  return editMode ? (
    <TextField
      value={inputTitle}
      onBlur={onClickActivateViewMode}
      onChange={onChangeChangeInputTitleHandler}
      autoFocus
    />
  ) : (
    <span className={isDone ? "is_done" : ""} onDoubleClick={onClickActivateEditMode}>
      {inputTitle}
    </span>
  )
}
