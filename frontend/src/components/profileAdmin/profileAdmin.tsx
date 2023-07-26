import { useState, useEffect } from "react";
import axios from "axios";

import { User } from "@/app/register/type"
import { BASE_URL } from "@/utils/request";
import { getCookie } from "cookies-next";
import Squads from "../team/squad";
import SelectSquad from "../team/selectSquad";
import { Squad } from "../team/type";

interface ProfileAdminProps {
    user: User
}

export default function ProfileAdmin({ user }: ProfileAdminProps) {

    const [users, setUsers] = useState<User[]>([])
    const [squads, setSquads] = useState<Squad[]>([])
    const token = getCookie('authorization')

    async function getUsersCompany() {
        try {
            const usersData = await axios.get(`${BASE_URL}/api/users`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            setUsers(usersData.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getSquads() {
        try {
            const response = await axios.get(`${BASE_URL}/api/squad`, {
                headers: {
                    Authorization: `${token}`
                }
            })

            setSquads(response.data)
            console.log(squads)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersCompany()
    }, [])

    return (
        <section className="flex flex-row flex-grow w-full">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-2/6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user.name}</h1>
                <div className="mb-4">
                    <p className="text-gray-600">Role: {user.role}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2 text-gray-800">Contact Information</h2>
                    <p className="text-gray-600">Phone: {user.tel}</p>
                    <p className="text-gray-600">Email: {user.email}</p>
                </div>
            </div>
            <div className="flex flex-col w-5/6">
                <div className="flex justify-center h-3/6">
                    <Squads squads={squads} getSquads={getSquads} />
                </div>
                <div className="flex justify-center h-3/6">
                    <SelectSquad users={users} squads={squads} />
                </div>
            </div>
        </section >
    );
}