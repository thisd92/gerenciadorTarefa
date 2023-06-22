'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { BASE_URL } from "@/utils/request"
import { authToken, getToken } from "@/services/auth"
import { Project } from "@/components/projectItem/type"
import { getCookie } from "cookies-next"
import TaskManager from "../taskManager/page"

interface ProjectProps {
    params: {
        id: string
    }
}

export default function ProjectData({ params }: ProjectProps) {
    const initialProject: Project = {
        name: "",
        description: "",
        toDo: false,
        isFinished: false
    }

    const router = useRouter()

    const [projectData, setProjectData] = useState<Project>(initialProject);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(`${getToken()}`)
        authToken({ router })
        if (params.id) fetchProjectData()
    }, [params.id])

    async function fetchProjectData() {
        try {
            const response = await axios.get(`${BASE_URL}/api/projects/${params.id}`, {
                headers: {
                    Authorization: `${getToken()}`
                }
            })
            setProjectData(response.data)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <main className="flex flex-grow justify-center items-center">
                <p className="text-xl font-semibold">
                    Loading
                    <span className="animate-pulse">...</span>
                </p>
            </main>
        );
    }

    return (
        <main className="flex flex-row flex-grow justify-center w-full">
            <div className="bg-gray-100 w-1/4 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Project: {projectData.name}</h1>
                <div className="mb-4">
                    <p className="text-gray-600">Description: {projectData.description}</p>
                </div>
            </div>
            <TaskManager />
        </main>
    )
}