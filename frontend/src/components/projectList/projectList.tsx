'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { BASE_URL } from '@/utils/request';
import { getToken } from '@/services/auth';
import { Project } from '../projectItem/type';
import ProjectItem from '../projectItem/projectItem';

interface ProjectListProps {
    projects: Project[];
    getProjects: () => void
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, getProjects }) => {
    const [projectList, setProjectList] = useState<Project[]>([]);
    const [expandedProject, setExpandedProject] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectPerPage] = useState(10);

    const indexOfLastTask = currentPage * projectPerPage;
    const indexOfFirstTask = indexOfLastTask - projectPerPage;
    const currentProjects = projectList.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = Math.ceil(projectList.length / projectPerPage);
    const pagination = [];
    for (let i = 1; i <= pageNumbers; i++) {
        pagination.push(
            <button
                key={i}
                onClick={() => paginate(i)}
                className={`px-2 py-1 mx-1 rounded ${i === currentPage ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
            >
                {i}
            </button>
        );
    }

    useEffect(() => {
        setProjectList(projects);
    }, [projects]);

    async function handleCheckboxChange(projectId: string, property: keyof Project) {
        try {
            const updatedProjects = projectList.map((project) => {
                if (project._id === projectId) {
                    let updatedProject: Project;

                    // Update the target property to true and set other properties to false
                    switch (property) {
                        case "toDo":
                            updatedProject = {
                                ...project,
                                toDo: true,
                                isFinished: false
                            };
                            console.log(updatedProject)
                            break;
                        case "isFinished":
                            updatedProject = {
                                ...project,
                                toDo: false,
                                isFinished: true
                            };
                            console.log(updatedProject)
                            break;
                        default:
                            updatedProject = project;
                            break;
                    }

                    axios.put(`${BASE_URL}/api/projects/${projectId}`, updatedProject, {
                        headers: {
                            Authorization: `${getToken()}`
                        }
                    });
                    return updatedProject;
                }

                return project;
            });

            setProjectList(updatedProjects);
            console.log("Task updated successfully");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    return (
        <section className="w-2/6">
            <div className="border-2 border-gray-300 rounded-md shadow-lg pt-6 pb-8 mb-4">
                <header className="flex font-bold p-1 justify-center">
                    <div>
                        <h1 className='font-bold'>Project List</h1>
                    </div>
                </header>
                <div className="flex flex-col mt-4">
                    <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 p-2 shadow-lg min-h-[430px]">
                        {currentProjects.map((project, index) => (
                            <ProjectItem
                                index={index}
                                key={project._id}
                                project={project}
                                getProjects={getProjects}
                            />
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center mt-4">{pagination}</div>
            </div>
        </section>

    );
};

export default ProjectList;
