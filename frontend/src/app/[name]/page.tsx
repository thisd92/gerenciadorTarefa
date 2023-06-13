'use client'
import ProfileAdmin from "@/components/profileAdmin/profileAdmin"
import ProfileUser from "@/components/profileUser/profileUser"
import axios from "axios"

import { useEffect, useState } from "react"
import { BASE_URL } from "../../utils/request"

interface UserProps {
    params: {
        name: string
    }
}

export default function Profile({ params }: UserProps) {


    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        handleRole()

    }, [])

    async function handleRole() {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/${params.name}`)
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