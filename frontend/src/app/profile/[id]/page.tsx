'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import ProfileAdmin from "@/components/profileAdmin/profileAdmin"
import ProfileUser from "@/components/profileUser/profileUser"
import { BASE_URL } from "@/utils/request"
import { authToken } from "@/services/auth"

interface UserProps {
    params: {
        id: string
    }
}

export default function Profile({ params }: UserProps) {

    const router = useRouter()

    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        authToken({router})
        handleRole()
    }, [])

    async function handleRole() {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/${params.id}`)
            const role = response.data.role
            if (role === "user") {
                setUser(true)
            } else {
                setAdmin(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <main className="flex flex-col flex-grow justify-center">
            {user && <ProfileUser />}
            {admin && <ProfileAdmin />}
        </main>
    )
}