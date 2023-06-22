'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'

import { AddBtn, KanbanButton, ListButton } from '@/components/buttons/Buttons';
import { BASE_URL } from '../../utils/request';
import { Task } from './type';
import Kanban from '../kanban/Kanban';
import TaskList from '../taskList/TaskList';
import AddTask from '@/components/addTask/AddTask';
import SpanError from '@/components/spanError/spanError';
import SpanSuccess from '@/components/spanSuccess/spanSuccess';
import { authToken, validateToken } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

interface TaskManagerProps {
    projectId: string
}

export default function TaskManager({ projectId }: TaskManagerProps) {

    const [tasks, setTasks] = useState<Task[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [list, setList] = useState(true)
    const [kanban, setKanban] = useState(false)
    const [addTask, setAddTask] = useState(false)

    const router = useRouter()

    useEffect(() => {
        getTasks();
        authToken({ router })
    }, []);

    async function getTasks() {
        try {
            const token = getCookie('authorization');
            const response = await axios.get(`${BASE_URL}/api/tasks?projectId=${projectId}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.log('Erro ao obter as tarefas:', error);
            setErrorMsg('Não foi possível recuperar a lista de tarefas!');
        }
    }

    const handleAddTask = () => {
        setAddTask(!addTask);
    };

    const handleListClick = () => {
        setList(!list);
        setKanban(false);
    };

    const handleKanbanClick = () => {
        setKanban(!kanban);
        setList(false);
    };

    const addTaskToList = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    const [showMessage, setShowMessage] = useState(false);

    return (
        <main className="flex flex-col flex-grow items-center mt-4 w-5/6" >
            <section className='flex flex-col items-center w-2/6 mb-4'>
                <div className='flex flex-row justify-around w-3/4'>
                    <AddBtn active={addTask} onClick={handleAddTask} />
                    <ListButton active={list} onClick={handleListClick} />
                    <KanbanButton active={kanban} onClick={handleKanbanClick} />
                </div>
                {showMessage && <SpanSuccess>Tarefa adicionada com sucesso</SpanSuccess>}
                {addTask && <AddTask projectId={projectId} addTaskToList={addTaskToList} getTasks={getTasks} handleAddTask={handleAddTask} />}
            </section>
            <SpanError>{errorMsg}</SpanError>
            {list && <TaskList tasks={tasks} getTasks={getTasks} />}
            {kanban && <Kanban getTasks={getTasks} tasks={tasks} />}
        </main>
    )
}