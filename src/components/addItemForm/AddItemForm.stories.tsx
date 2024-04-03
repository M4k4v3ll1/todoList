import { AddItemForm, AddItemFormPropsType } from "./AddItemForm"
import { action } from "@storybook/addon-actions"
import { Meta, StoryObj } from "@storybook/react"
import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import ControlPoint from "@mui/icons-material/ControlPoint"

const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm Component",
  component: AddItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
      action: "clicked",
    },
  },
}

const callback = action('Button "add" was pressed inside the form')
export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: FC<AddItemFormPropsType> = memo(({ addItem, disabled }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>("Title is required")
  const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onClickAddTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      addItem(newTaskTitle.trim())
      setNewTaskTitle("")
    } else {
      setError("Title is required")
    }
  }
  const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItem(newTaskTitle)
      setNewTaskTitle("")
    }
  }
  return (
    <div>
      <TextField
        error={!!error}
        helperText={error}
        value={newTaskTitle}
        variant={"outlined"}
        label={"Add text"}
        onChange={onChangeNewTitleHandler}
        onKeyPress={onKeyPressAddTaskHandler}
        disabled={disabled}
      />
      <IconButton onClick={onClickAddTaskHandler} disabled={disabled}>
        <ControlPoint />
      </IconButton>
    </div>
  )
})

export const AddItemFormWithErrorStory: Story = {
  render: () => <AddItemFormStory addItem={action("Button clicked inside form")} />,
}
export const AddItemFormDisabledExample: Story = {
  render: () => <AddItemFormStory addItem={action("Button clicked inside form")} disabled={true} />,
}
