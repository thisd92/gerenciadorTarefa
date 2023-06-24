'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { authToken, getToken } from "@/services/auth";
import { BASE_URL } from "@/utils/request";
import { BarChart, PieChart } from "@/components/charts/charts";
import TaskCard from "@/components/taskCard/taskCard";
import { Task } from "../../components/taskManager/type";
import { useRouter } from "next/navigation";
import { Project } from "@/components/projectItem/type";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        authToken({ router })
        const fetchData = async () => {
            try {
                const responseTasks = await axios.get(`${BASE_URL}/api/allTasks`, {
                    headers: {
                        Authorization: getToken(),
                    },
                });
                const responseProjects = await axios.get(`${BASE_URL}/api/projects`, {
                    headers: {
                        Authorization: getToken(),
                    },
                });
                setTasks(responseTasks.data);
                setProjects(responseProjects.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Filtra as tarefas por estado
    const tasksToDo: Task[] = tasks.filter((task: Task) => task.toDo);
    const tasksInProgress: Task[] = tasks.filter((task: Task) => task.isInProgress);
    const tasksFinished: Task[] = tasks.filter((task: Task) => task.isFinished);

    // Filtra os projetos por estado
    const projectsToDo: Project[] = projects.filter((project: Project) => project.toDo);
    const projectsFinished: Project[] = projects.filter((project: Project) => project.isFinished);

    // Calcula a quantidade de projetos em cada estado
    const countProjectsToDo = projectsToDo.length;
    const countProjectsFinished = projectsFinished.length;

    // Calcula a quantidade de tarefas em cada estado
    const countToDo = tasksToDo.length;
    const countInProgress = tasksInProgress.length;
    const countFinished = tasksFinished.length;

    const sumTasks = (countToDo + countInProgress + countFinished)
    const sumProjects = (countProjectsToDo + countProjectsFinished)

    if (loading) {
        return (
            <main className="flex flex-grow flex-col items-center justify-center w-3/4 my-4 md:w-full">
                <p>Loading<span className="animate-pulse">...</span></p>
            </main>
        );
    }

    return (
        <main className="flex flex-grow flex-col items-center h-full w-3/4 my-4 md:w-full">
            <div>
                <h1 className="font-bold text-lg">Dashboard</h1>
            </div>
            <section className="flex flex-row flex-wrap w-full justify-around mt-4">
                <div className="flex flex-col items-center rounded-lg shadow-md shadow-gray-400 justify-center w-1/4 bg-gray-100 p-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">Projects</h2>
                        <div>
                            <p className="text-sm">Total: {sumProjects}</p>
                            <p className="text-sm">To Do: {countProjectsToDo}</p>
                            <p className="text-sm">Finished: {countProjectsFinished}</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <h2 className="text-xl font-bold">Tasks</h2>
                        <div>
                            <p className="text-sm">Total: {sumTasks}</p>
                            <p className="text-sm">To Do: {countToDo}</p>
                            <p className="text-sm">In Progress: {countInProgress}</p>
                            <p className="text-sm">Finished: {countFinished}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center rounded-lg shadow-md shadow-gray-400 justify-center w-1/4 bg-gray-100 p-1">
                    <BarChart
                        data={[
                            { label: "To Do", value: countProjectsToDo },
                            { label: "Finished", value: countProjectsFinished },
                        ]}
                    />
                </div>
                <div className="flex items-center rounded-lg shadow-md shadow-gray-400 justify-center w-1/4 bg-gray-100 p-1">
                    <PieChart
                        data={[
                            { label: "To Do", value: countToDo },
                            { label: "In Progress", value: countInProgress },
                            { label: "Finished", value: countFinished },
                        ]}
                    />
                </div>
                <div className="flex flex-col items-center rounded-lg shadow-md shadow-gray-400 justify-center bg-gray-100 p-2 mt-4">
                    <h2 className="font-bold">Task Board</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <TaskCard title="To Do" tasks={tasksToDo} />
                        <TaskCard title="In Progress" tasks={tasksInProgress} />
                        <TaskCard title="Finished" tasks={tasksFinished} />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
