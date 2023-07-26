import { User } from "@/app/register/type";
import { BASE_URL } from "@/utils/request";
import axios from "axios";
import { useRef, useState } from "react";
import LabelForm from "../labelForm/labelForm";
import { FormInput } from "../formInput/formInput";
import { FormButton } from "../buttons/Buttons";
import { Squad } from "./type";
import { getCookie } from "cookies-next";
import { MdAddTask } from "react-icons/md";
import { AiOutlineCloseSquare } from "react-icons/ai";

export default function AddSquad(
    { addSquad, handleAddSquad }: {
        addSquad: () => void,
        handleAddSquad: () => void
    }) {

    const newSquad = {
        name: ""
    }

    const [squad, setSquad] = useState<Squad>(newSquad);

    const formRef = useRef<HTMLFormElement>(null)

    function resetValues() {
        setSquad(newSquad)
        if (formRef.current) formRef.current.reset()
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setSquad({ ...squad, [name]: value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const token = getCookie('authorization')
        try {
            await axios.post(`${BASE_URL}/api/squad`, squad, {
                headers: {
                    Authorization: `${token}`
                }
            });
            resetValues()
            alert("Squad Cadastrada")
            handleAddSquad()
            addSquad()
        } catch (error) {
            console.log(error)
        };
    }

    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
            <div className="max-h-full w-full max-w-sm overflow-y-auto sm:rounded-2xl bg-gray-200">
                <div className="w-full">
                    <div className="m-8 my-10 max-w-[300px] mx-auto">
                        <div className="mb-8">
                            <div className="flex flex-col mt-4">
                                <header className="flex flex-row items-center mb-4 font-bold">
                                    <MdAddTask className="mr-1" size={20} />
                                    <h1>Add Squad</h1>
                                    <button className="ml-auto text-gray-500 hover:text-gray-700" onClick={handleAddSquad}>
                                        <AiOutlineCloseSquare size={20} />
                                    </button>
                                </header>
                                <div className="flex flex-col mt-4">
                                    <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                        <div>
                                            <LabelForm htmlFor="name">Squad</LabelForm>
                                            <FormInput type="text" name="name" id="name" onChange={handleChange} required />
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <FormButton type="submit">Save</FormButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
