import { action } from "@storybook/addon-actions"
import { Task } from "features/todolistsList/ui/todolist/Tasks/task/Task"
import { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/api/tasks/tasksApi.types"

type Story = StoryObj<typeof Task>

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task Component",
  component: Task,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    task: {
      todoListId: "13",
      id: "1",
      title: "CSS",
      status: TaskStatuses.Completed,
      description: "",
      priority: TaskPriorities.High,
      addedDate: new Date(),
      startDate: new Date(),
      deadline: new Date(),
      order: 0,
    },
    todoListID: "12",
  },
  argTypes: {},
}

export default meta

export const TaskIsDoneStory: Story = {}
export const TaskIsNotDoneStory: Story = {
  args: {
    task: {
      todoListId: "13",
      id: "2",
      title: "React",
      status: TaskStatuses.New,
      description: "",
      priority: TaskPriorities.High,
      addedDate: new Date(),
      startDate: new Date(),
      deadline: new Date(),
      order: 0,
    },
    todoListID: "13",
  },
}

export const TaskStory = () => {
  const todoListID: string = "56"
  const [task, setTask] = useState<TaskType>({
    todoListId: "13",
    id: "1",
    title: "CSS",
    status: TaskStatuses.Completed,
    description: "",
    priority: TaskPriorities.High,
    addedDate: new Date(),
    startDate: new Date(),
    deadline: new Date(),
    order: 0,
  })
  const changeTaskStatusHandler = () => {
    setTask({ ...task, status: TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed })
  }

  return <Task task={task} todoListID={todoListID} />
}
