import { Squad } from "./type"

interface SquadListProps {
    squads: Squad[]
}

export default function SquadList({ squads }: SquadListProps) {
    return (
        <div className="w-full p-4">
            <div>
                <ul>
                    {squads.map((squad, i) => (
                        <li key={i}>{squad.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}