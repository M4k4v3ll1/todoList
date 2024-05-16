import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import ControlPoint from "@mui/icons-material/ControlPoint"
import { BaseResponseType } from "common/types"

export type Props = {
  addItem: (newTaskTitle: string) => Promise<any>
  disabled?: boolean
}
export const AddItemForm = ({ addItem, disabled = false }: Props) => {
  const [newTitle, setNewTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const addNewItemHandlerUtility = (newTitle: string) => {
    addItem(newTitle.trim())
      .then((res) => {
        setNewTitle("")
      })
      .catch((err: BaseResponseType) => {
        if (err?.resultCode) {
          setError(err.messages[0])
        }
      })
  }
  const addNewItemHandler = () => {
    if (newTitle.trim() !== "") {
      addNewItemHandlerUtility(newTitle)
    } else {
      setError("Title is required")
    }
  }
  const addItemOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null)
    }
    if (e.charCode === 13 && newTitle.trim() !== "") {
      addNewItemHandlerUtility(newTitle)
    } else if (e.charCode === 13 && newTitle.trim() === "") {
      setError("Title is required")
    }
  }
  return (
    <div>
      <TextField
        error={!!error}
        helperText={error}
        value={newTitle}
        variant={"outlined"}
        label={"Add text"}
        onChange={changeTitleHandler}
        onKeyPress={addItemOnKeyPressHandler}
        disabled={disabled}
      />
      <IconButton onClick={addNewItemHandler} disabled={disabled} color={"primary"}>
        <ControlPoint />
      </IconButton>
    </div>
  )
}
