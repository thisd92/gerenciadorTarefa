import { Squad } from "./type";

interface SelectProps {
    userSquad?: string,
    squads: Squad[],
    selectedSquad: string,
    setSelectedSquad: React.Dispatch<React.SetStateAction<string>>
}

function Select({ squads, selectedSquad, setSelectedSquad, userSquad }: SelectProps) {

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedSquad(event.target.value);
        console.log(selectedSquad)
        console.log(userSquad)
    }

    return (
        <select name="squad" id="squad" value={selectedSquad} onChange={handleSelectChange} >
            <option>Select a Squad...</option>
            {squads.map((squad) => (
                <option key={squad._id} value={squad._id} selected={squad._id === userSquad}>{squad.name}</option>
            ))}
        </select>
    )
}

export { Select }