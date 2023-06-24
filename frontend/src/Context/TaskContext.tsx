import { Task } from '@/components/taskManager/type';
import { BASE_URL } from '@/utils/request';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { ReactNode, createContext, useCallback, useState, useEffect } from 'react';

interface TaskContextProps {
    tasks: Task[];
    getTasks: (projectId: string) => void;
    errorMsg: string;
}

interface TaskProviderProps {
    children: ReactNode,
    projectId: string
}

export const TaskContext = createContext<TaskContextProps>({
    tasks: [],
    getTasks: () => { },
    errorMsg: '',
});

export const TaskProvider: React.FC<TaskProviderProps> = ({ children, projectId }) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [errorMsg, setErrorMsg] = useState('')

    const fetchTasks = useCallback(async (projectId: string) => {
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

    }, [projectId, tasks])

    useEffect(() => {
        fetchTasks(projectId)
    }, [])

    return (
        <TaskContext.Provider value={{ tasks, getTasks: fetchTasks, errorMsg }}>
            {children}
        </TaskContext.Provider>
    )
}