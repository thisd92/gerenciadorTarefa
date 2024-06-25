import axios from "axios"
import { getCookie } from "cookies-next"

import { useState } from "react"

import { User } from "@/app/register/type"
import { UpdateSquadBtn } from "../buttons/Buttons"
import { Squad } from "./type"
import { Select } from "./selectForm"
import LabelForm from "../labelForm/labelForm"
import { BASE_URL } from "@/utils/request"

interface UserSquadProps {
    index: number,
    user: User,
    squads: Squad[]
}

export default function UserSquad({ index, user, squads }: UserSquadProps) {

    const [selectedSquad, setSelectedSquad] = useState<string>("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const token = getCookie('authorization')
        if (selectedSquad !== null) {
            try {

                await axios.put(`${BASE_URL}/api/user/${user._id}`, {
                    ...user,
                    squad: selectedSquad
                }, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                alert(`Usuário adicionado à Squad`)
                console.log(`User ${user.name} squad updated successfully!`);
            } catch (error) {
                alert('Usuário já pertence ao Squad')
                console.log(error);
            }
        } else {
            console.log("Please select a squad for the user.");
        }
    }

    return (
        <li key={user._id}
            className={`${index % 2 === 0 ? 'bg-stone-300' : 'bg-stone-200'}`} >
            <div className="flex flex-row p-2">
                <div className="w-full flex justify-between">
                    <div>
                        <span className="font-bold">
                            Name: {user.name}
                        </span>
                    </div>
                    <div className="w-3/6 flex">
                        <form action="" className="w-full flex justify-around">
                            <LabelForm htmlFor="squad">
                                Select a Squad:
                            </LabelForm>
                            <Select squads={squads} selectedSquad={selectedSquad} userSquad={user.squad} setSelectedSquad={setSelectedSquad} />
                            <UpdateSquadBtn onClick={handleSubmit} />
                        </form>
                    </div>
                </div>
            </div>
        </li>
    )
}