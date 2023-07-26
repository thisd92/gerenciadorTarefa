import { useState, useEffect } from "react";

import AddSquad from "./addSquad";
import { Squad } from "./type";
import SquadList from "./squadList";
import { AddSquadBtn } from "../buttons/Buttons";

interface SquadsProps {
    squads: Squad[],
    getSquads: () => void
}

export default function Squads({ squads, getSquads }: SquadsProps) {

    const [addSquad, setAddSquad] = useState(false)

    function handleAddSquad() {
        setAddSquad(!addSquad);
    }

    useEffect(() => {
        getSquads()
        console.log(squads)
    }, [])

    return (
        <div className="w-4/6 bg-gray-100 p-4 rounded-lg shadow-md mt-4">
            <div>
                <div className="flex justify-between text-center">
                    <div>
                        <h1 className="font-bold">Company&apos;s Squads</h1>
                    </div>
                    <div>
                        <AddSquadBtn active={addSquad} onClick={handleAddSquad} />
                    </div>
                </div>
                <SquadList squads={squads} />
            </div>
            {addSquad && <AddSquad addSquad={getSquads} handleAddSquad={handleAddSquad} />}
        </div>
    )
}