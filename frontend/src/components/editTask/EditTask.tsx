import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";

import { AiOutlineCloseSquare } from "react-icons/ai"
import { MdEdit } from "react-icons/md";

import { BASE_URL } from "../../utils/request";
import { Task } from "@/components/taskManager/type";
import { FormButton } from "../buttons/Buttons";
import { FormInput, TextArea } from "../formInput/formInput";
import LabelForm from "../labelForm/labelForm";
import SpanError from "../spanError/spanError";
import { getToken } from "@/services/auth";
import { TaskContext } from "@/Context/TaskContext";

export default function EditTask(
    { handleEditTask, taskId, projectId }: {
        handleEditTask: () => void,
        taskId: string
        projectId: string
    }) {

    const newTask: Task = {
        name: "",
        description: "",
        toDo: false,
        isInProgress: false,
        isFinished: false,
    }

    const [task, setTask] = useState<Task>(newTask)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const { getTasks } = useContext(TaskContext)

    useEffect(() => {
        getTask()
    }, [])

    async function getTask() {
        const response = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
            headers: {
                Authorization: `${getToken()}`
            }
        })
        setTask(response.data)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    function onCheckboxChange(property: keyof Task) {
        switch (property) {
            case "toDo":
                setTask({
                    ...task,
                    toDo: true,
                    isInProgress: false,
                    isFinished: false
                });
                break;
            case "isInProgress":
                setTask({
                    ...task,
                    toDo: false,
                    isInProgress: true,
                    isFinished: false
                });
                break;
            case "isFinished":
                setTask({
                    ...task,
                    toDo: false,
                    isInProgress: false,
                    isFinished: true
                });
                break;
            default:
                task;
                break;
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setIsLoading(true);
            await axios.put(`${BASE_URL}/api/tasks/${task?._id}`, task, {
                headers: {
                    Authorization: `${getToken()}`
                }
            });
            handleEditTask()
            getTasks(projectId)
        } catch (error) {
            setErrorMsg("erro")
            setTimeout(() => setErrorMsg(""), 2000)
            console.log(error)
        } finally {
            setIsLoading(false);
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
                                    <MdEdit className="mr-1" size={20} />
                                    <h1>Edit Task</h1>
                                    <button className="ml-auto text-gray-500 hover:text-gray-700" onClick={handleEditTask}>
                                        <AiOutlineCloseSquare size={20} />
                                    </button>
                                </header>
                                <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <LabelForm htmlFor="name">Task Name</LabelForm>
                                        <FormInput type="text" readOnly={true} value={task.name} name="name" id="name" onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <LabelForm htmlFor="description">Description</LabelForm>
                                        <TextArea rows={6} name="description" value={task.description} id="description" onChange={handleTextChange} />
                                        <SpanError>{errorMsg}</SpanError>
                                    </div>
                                    <div className="flex items-center">
                                        <span>To Do </span>
                                        <input
                                            type="checkbox"
                                            name="toDo"
                                            checked={task.toDo}
                                            onChange={() => task._id && onCheckboxChange('toDo')}
                                            className="ml-2"
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span>In Progress? </span>
                                        <input
                                            type="checkbox"
                                            name="isInProgress"
                                            checked={task.isInProgress}
                                            onChange={() => task._id && onCheckboxChange("isInProgress")}
                                            className="ml-2"
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span>Finished </span>
                                        <input
                                            type="checkbox"
                                            name="isFinished"
                                            checked={task.isFinished}
                                            onChange={() => task._id && onCheckboxChange("isFinished")}
                                            className="ml-2"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <FormButton type="submit" disabled={isLoading}>{isLoading ? "Updating" : "Update"}</FormButton>
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