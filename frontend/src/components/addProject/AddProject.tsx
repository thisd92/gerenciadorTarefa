'use client'
import axios from "axios";
import { useRef, useState } from "react";

import { AiOutlineCloseSquare } from "react-icons/ai"
import { MdAddTask } from "react-icons/md";

import { BASE_URL } from "../../utils/request";
import { FormButton } from "../buttons/Buttons";
import { FormInput, TextArea } from "../formInput/formInput";
import LabelForm from "../labelForm/labelForm";
import SpanError from "../spanError/spanError";
import { getCookie } from "cookies-next";
import { Project } from "../projectItem/type";

export default function AddProject(
    { getProjects, handleAddProject, addProjectToList }: {
        getProjects: () => void,
        handleAddProject: () => void,
        addProjectToList: () => void
    }) {

    const newProject: Project = {
        name: "",
        description: "",
        toDo: true,
        isFinished: false,
    }

    const [project, setProject] = useState<Project>(newProject)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setProject({ ...project, [name]: value })
    }

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        setProject({ ...project, [name]: value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setIsLoading(true);
            const token = getCookie('authorization')
            await axios.post(`${BASE_URL}/api/projects`, project, {
                headers: {
                    Authorization: `${token}`
                }
            });
            resetValues()
            getProjects()
            handleAddProject()
            addProjectToList()
        } catch (error) {
            setErrorMsg("erro")
            setTimeout(() => setErrorMsg(""), 2000)
            console.log(error)
        } finally {
            setIsLoading(false);
        };
    }

    function resetValues() {
        setProject(newProject)
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
                                    <h1>Add New Project</h1>
                                    <button className="ml-auto text-gray-500 hover:text-gray-700" onClick={handleAddProject}>
                                        <AiOutlineCloseSquare size={20} />
                                    </button>
                                </header>
                                <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <LabelForm htmlFor="name">Project Name</LabelForm>
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