import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { AiOutlineCloseSquare } from "react-icons/ai"
import { MdEdit } from "react-icons/md";

import { BASE_URL } from "../../utils/request";
import { FormButton } from "../buttons/Buttons";
import { FormInput, TextArea } from "../formInput/formInput";
import LabelForm from "../labelForm/labelForm";
import SpanError from "../spanError/spanError";
import { getToken } from "@/services/auth";
import { Project } from "../projectItem/type";

export default function EditProject(
    { getProjects, handleEditProject, projectId }: {
        getProjects: () => void,
        handleEditProject: () => void,
        projectId: string
    }) {

    const newProject: Project = {
        name: "",
        description: "",
        toDo: false,
        isFinished: false,
    }

    const [project, setProject] = useState<Project>(newProject)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        getProject()
    }, [])

    async function getProject() {
        try {
            const response = await axios.get(`${BASE_URL}/api/projects/${projectId}`, {
                headers: {
                    Authorization: `${getToken()}`
                }
            })
            console.log(response.data)
            setProject(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setProject({ ...project, [name]: value })
    }

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        setProject({ ...project, [name]: value })
    }

    function onCheckboxChange(property: keyof Project) {
        switch (property) {
            case "toDo":
                setProject({
                    ...project,
                    toDo: true,
                    isFinished: false
                });
                break;
            case "isFinished":
                setProject({
                    ...project,
                    toDo: false,
                    isFinished: true
                });
                break;
            default:
                project;
                break;
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setIsLoading(true);
            await axios.put(`${BASE_URL}/api/projects/${project?._id}`, project, {
                headers: {
                    Authorization: `${getToken()}`
                }
            });
            getProjects()
            handleEditProject()
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
                                    <h1>Edit Project</h1>
                                    <button className="ml-auto text-gray-500 hover:text-gray-700" onClick={handleEditProject}>
                                        <AiOutlineCloseSquare size={20} />
                                    </button>
                                </header>
                                <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <LabelForm htmlFor="name">Project Name</LabelForm>
                                        <FormInput type="text" readOnly={true} value={project.name} name="name" id="name" onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <LabelForm htmlFor="description">Description</LabelForm>
                                        <TextArea rows={6} name="description" value={project.description} id="description" onChange={handleTextChange} />
                                        <SpanError>{errorMsg}</SpanError>
                                    </div>
                                    <div className="flex items-center">
                                        <span>To Do </span>
                                        <input
                                            type="checkbox"
                                            name="toDo"
                                            checked={project.toDo}
                                            onChange={() => project._id && onCheckboxChange('toDo')}
                                            className="ml-2"
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span>Finished </span>
                                        <input
                                            type="checkbox"
                                            name="isFinished"
                                            checked={project.isFinished}
                                            onChange={() => project._id && onCheckboxChange("isFinished")}
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