'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'

import { AddTaskBtn, KanbanButton, ListButton } from '@/components/buttons/Buttons';
import { BASE_URL } from '../../../utils/request';
import { Task } from './type';
import Kanban from '../../components/kanban/Kanban';
import TaskList from '../../components/taskList/TaskList';
import AddTask from '@/components/addTaks/AddTask';
import SpanError from '@/components/spanError/spanError';
import SpanSuccess from '@/components/spanSuccess/spanSuccess';


export default function TaskManager() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [list, setList] = useState(true)
    const [kanban, setKanban] = useState(false)
    const [addTask, setAddTask] = useState(false)

    useEffect(() => {
        getTasks();
    }, []);

    async function getTasks() {
        try {
            await axios.get(`${BASE_URL}/api/tasks`)
                .then((t) => {
                    setTasks(t.data)
                })
        } catch (error) {
            console.log('Erro ao obter as tarefas:', error);
            setErrorMsg('Não foi possível recuperar a lista de tarefas!')
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
        <main className="flex min-h-screen flex-col items-center mt-8" >
            <section className='w-1/6 mb-4'>
                <div className='flex flex-row justify-around'>
                    <AddTaskBtn active={addTask} onClick={handleAddTask} />
                    <ListButton active={list} onClick={handleListClick} />
                    <KanbanButton active={kanban} onClick={handleKanbanClick} />
                    <SpanError>{errorMsg}</SpanError>
                </div>
                {showMessage && <SpanSuccess>Tarefa adicionada com sucesso</SpanSuccess>}
                {addTask && <AddTask addTaskToList={addTaskToList} getTasks={getTasks} handleAddTask={handleAddTask} />}
            </section>
            {list && <TaskList tasks={tasks} />}
            {kanban && <Kanban getTasks={getTasks} tasks={tasks} />}
        </main>
    )
}