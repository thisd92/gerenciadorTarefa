import { User } from "@/app/register/type"
import UserSquad from "./userSquad"
import { Squad } from "./type"

interface SelectSquadProps {
    users: User[],
    squads: Squad[]
}

export default function SelectSquad({ users, squads }: SelectSquadProps) {
    return (
        <div className="w-4/6 bg-gray-100 p-4 rounded-lg shadow-md text-center mt-2">
            <h1 className="font-bold">Company&apos;s Users</h1>
            <div>
                <ul>
                    {users.map((user, i) => (
                        <div key={i}>
                            <UserSquad index={i} user={user} squads={squads} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}