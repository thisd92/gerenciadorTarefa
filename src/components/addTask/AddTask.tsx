import axios from "axios";
import { useRef, useState, useContext } from "react";

import { AiOutlineCloseSquare } from "react-icons/ai"
import { MdAddTask } from "react-icons/md";

import { BASE_URL } from "../../utils/request";
import { Task } from "@/components/taskManager/type";
import { FormButton } from "../buttons/Buttons";
import { FormInput, TextArea } from "../formInput/formInput";
import LabelForm from "../labelForm/labelForm";
import SpanError from "../spanError/spanError";
import { getCookie } from "cookies-next";
import { TaskContext } from "@/Context/TaskContext";

export default function AddTask(
    { handleAddTask, addTaskToList, projectId }: {
        handleAddTask: () => void,
        addTaskToList: () => void,
        projectId: string
    }) {

    const newTask: Task = {
        name: "",
        description: "",
        toDo: true,
        isInProgress: false,
        isFinished: false,
        project: projectId
    }

    const { getTasks } = useContext(TaskContext)

    const [task, setTask] = useState<Task>(newTask)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setIsLoading(true);
            const token = getCookie('authorization')
            await axios.post(`${BASE_URL}/api/tasks`, task, {
                headers: {
                    Authorization: `${token}`
                },
            });
            console.log(projectId)
            resetValues()
            getTasks(projectId)
            handleAddTask()
            addTaskToList()
        } catch (error) {
            setErrorMsg("erro")
            setTimeout(() => setErrorMsg(""), 2000)
            console.log(error)
        } finally {
            setIsLoading(false);
        };
    }

    function resetValues() {
        setTask(newTask)
        if (formRef.current) formRef.current.reset()
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
                                    <h1>Add New Task</h1>
                                    <button className="ml-auto text-gray-500 hover:text-gray-700" onClick={handleAddTask}>
                                        <AiOutlineCloseSquare size={20} />
                                    </button>
                                </header>
                                <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <LabelForm htmlFor="name">Task Name</LabelForm>
                                        <FormInput type="text" name="name" id="name" onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <LabelForm htmlFor="description">Description</LabelForm>
                                        <TextArea rows={6} name="description" id="description" onChange={handleTextChange} required />
                                        <SpanError>{errorMsg}</SpanError>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <FormButton type="submit" disabled={isLoading}>{isLoading ? "Adding" : "Add"}</FormButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}