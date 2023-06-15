'use client'
import EditTask from "@/components/editTask/EditTask"
import { authToken } from "@/services/auth"
import { BASE_URL } from "@/utils/request"
import axios from "axios"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface TaskDataProps {
    params: {
        id: string
    }
}

export default function TaskData({ params }: TaskDataProps) {

    const router = useRouter()

    const [tasks, setTasks] = useState()
    const [taskData, setTaskData] = useState()

    const [editTask, setEditTask] = useState(false)

    const handleEditTask = () => {
        setEditTask(!editTask)
    }

    useEffect(() => {
        authToken({ router })
        fetchTaskData()

    })

    async function getTasks() {
        try {
            const token = getCookie('authorization')
            const response = await axios.get(`${BASE_URL}/api/tasks`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            setTasks(response.data)
        } catch (error) {
            console.log('Erro ao obter as tarefas:', error);
        }
    }

    async function fetchTaskData() {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/${params.id}`)
            setTaskData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <EditTask taskId={params.id} getTasks={getTasks} handleEditTask={handleEditTask} />
    )
}