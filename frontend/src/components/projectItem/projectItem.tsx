'use client'
import { useState } from "react";
import axios from "axios";

import { getToken } from "@/services/auth";
import { BASE_URL } from "@/utils/request";

import { DeleteBtn, EditBtn } from "../buttons/Buttons";
import { Project } from "./type";
import EditProject from "../editProject/EditProject";
import Link from "next/link";

interface ProjectItemProps {
    index: number
    project: Project;
    getProjects: () => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
    index,
    project,
    getProjects,
}) => {


    const [editProject, setEditProject] = useState(false)

    const handleEditProject = () => {
        setEditProject(!editProject)
    }

    const deleteProject = async () => {
        try {
            await axios.delete(`${BASE_URL}/api/projects/${project._id}`, {
                headers: {
                    Authorization: `${getToken()}`
                }
            })
            getProjects()
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <li key={project._id}
                className={`${index % 2 === 0 ? 'bg-stone-300' : 'bg-stone-200'}`} >
                <div className="flex flex-row p-2 justify-between">
                    <div>
                        <span className="font-bold">
                            Name: <Link href={`/project/${project._id}`}>{project.name}</Link>
                        </span>
                    </div>
                    <div className="flex flex-row items-center">
                        <EditBtn active={editProject} onClick={handleEditProject} />
                        <DeleteBtn onClick={deleteProject} />
                    </div>
                </div>
            </li>
            {editProject && <EditProject projectId={project._id ?? ""} getProjects={getProjects} handleEditProject={handleEditProject} />}
        </>
    )
}

export default ProjectItem;