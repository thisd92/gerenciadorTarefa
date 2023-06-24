'use client'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation';

import { AddBtn, KanbanButton, ListButton } from '@/components/buttons/Buttons';
import Kanban from '../kanban/Kanban';
import TaskList from '../taskList/TaskList';
import AddTask from '@/components/addTask/AddTask';
import SpanError from '@/components/spanError/spanError';
import SpanSuccess from '@/components/spanSuccess/spanSuccess';
import { authToken } from '@/services/auth';
import { TaskContext, TaskProvider } from '@/Context/TaskContext';

interface TaskManagerProps {
    projectId: string
}

export default function TaskManager({ projectId }: TaskManagerProps) {
    const [list, setList] = useState(true)
    const [kanban, setKanban] = useState(false)
    const [addTask, setAddTask] = useState(false)

    const { errorMsg } = useContext(TaskContext)

    const router = useRouter()

    useEffect(() => {
        authToken({ router })
        console.log('renderizou')
    }, []);

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
        <TaskProvider projectId={projectId}>
            <main className="flex flex-col flex-grow items-center mt-4 w-5/6" >
                <section className='flex flex-col items-center w-2/4 mb-4'>
                    <div className='flex flex-row justify-around w-3/4'>
                        <AddBtn active={addTask} onClick={handleAddTask} />
                        <ListButton active={list} onClick={handleListClick} />
                        <KanbanButton active={kanban} onClick={handleKanbanClick} />
                    </div>
                    {showMessage && <SpanSuccess>Tarefa adicionada com sucesso</SpanSuccess>}
                    {addTask && <AddTask projectId={projectId} addTaskToList={addTaskToList}
                        handleAddTask={handleAddTask} />}
                </section>
                <SpanError>{errorMsg}</SpanError>
                {list && <TaskList projectId={projectId} />}
                {kanban && <Kanban projectId={projectId} />}
            </main>
        </TaskProvider>
    )
}