import { Squad } from "./type";

interface SelectProps {
    squads: Squad[],
    selectedSquad: string,
    setSelectedSquad: React.Dispatch<React.SetStateAction<string>>
}

function Select({ squads, selectedSquad, setSelectedSquad }: SelectProps) {

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedSquad(event.target.value);
    }

    return (
        <select name="squad" id="squad" value={selectedSquad} onChange={handleSelectChange} >
            <option>Select a Squad...</option>
            {squads.map((squad) => (
                <option key={squad._id} value={squad._id}>{squad.name}</option>
            ))}
        </select>
    )
}

export { Select }