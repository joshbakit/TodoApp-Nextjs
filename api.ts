import { ITask } from "./types/task"


// const baseUrl = 'http://localhost:3001'
const baseUrl = 'https://todo-app-server-task.onrender.com'

export const getAllTodos = async (): Promise<ITask[]> => {

    const response = await fetch(`${baseUrl}/task`, { cache: 'no-store' })
    const data = await response.json()
    return data;
    console.log("connected to json-server")
}

export const addTodo = async (newTask: ITask): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask)
    })
    const data = await response.json()
    return data
}

export const editTodo = async (updateTask: ITask): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/task/${updateTask.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTask)
    })
    const updatedData = await response.json()
    return updatedData
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/task/${id}`, {
        method: 'DELETE',
    })}