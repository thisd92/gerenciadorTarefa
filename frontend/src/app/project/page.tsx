'use client'
import AddProject from '@/components/addProject/AddProject';
import { AddBtn, ListButton } from '@/components/buttons/Buttons';
import { Project } from '@/components/projectItem/type';
import ProjectList from '@/components/projectList/projectList';
import SpanError from '@/components/spanError/spanError';
import SpanSuccess from '@/components/spanSuccess/spanSuccess';
import { authToken } from '@/services/auth';
import { BASE_URL } from '@/utils/request';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function Project() {

    const router = useRouter();

    const [addProject, setAddProject] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const [list, setList] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [showMessage, setShowMessage] = useState(false);

    async function getProjects() {
        try {
            const token = getCookie('authorization')
            const response = await axios.get(`${BASE_URL}/api/projects`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            setProjects(response.data)
        } catch (error) {
            console.log('Erro ao obter as tarefas:', error);
            setErrorMsg('Não foi possível recuperar a lista de tarefas!')
        }
    }

    const handleListClick = () => {
        setList(!list);
    };

    const addProjectToList = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    const handleAddProject = () => {
        setAddProject(!addProject);
    };

    useEffect(() => {
        getProjects();
        authToken({ router })
    }, []);

    return (
        <main className="flex flex-col flex-grow items-center mt-4 w-5/6" >
            <section className='flex flex-col items-center w-2/6 mb-4'>
                <div className='flex flex-row justify-around w-3/4'>
                    <AddBtn active={addProject} onClick={handleAddProject} />
                    <ListButton active={list} onClick={handleListClick} />
                </div>
                {showMessage && <SpanSuccess>Tarefa adicionada com sucesso</SpanSuccess>}
                {addProject && <AddProject addProjectToList={addProjectToList} getProjects={getProjects} handleAddProject={handleAddProject} />}
            </section>
            <SpanError>{errorMsg}</SpanError>
            {list && <ProjectList projects={projects} getProjects={getProjects} />}
        </main>
    )
}