'use client'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'

import { BASE_URL } from '../../../utils/request';
import { Task } from './type';
import FormButton from "@/components/formButton/formButton";
import FormInput from "@/components/formInput/formInput";
import LabelForm from "@/components/labelForm/labelForm";
import SpanError from "@/components/spanError/spanError";
import TaskList from '@/components/taskList/TaskList';
import Kanban from '@/components/kanban/Kanban';

export default function TaskManager() {

    const newTask: Task = {
        name: "",
        description: "",
        toDo: true,
        isInProgress: false,
        isFinished: false,
        _id: ""
    }

    const [tasks, setTasks] = useState<Task[]>([])

    const [task, setTask] = useState<Task>(newTask)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        getTasks();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    function resetValues() {
        setTask(newTask)
        if (formRef.current) formRef.current.reset()
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setTask({...task, toDo: true, isInProgress: false, isFinished: false})
            setIsLoading(true);
            await axios.post(`${BASE_URL}/api/tasks`, task);
            resetValues()
            alert("Task saved")
        } catch (error) {
            setErrorMsg("Ver erro")
            setTimeout(() => setErrorMsg(""), 2000)
            console.log(error)
        } finally {
            setIsLoading(false);
        };
    }

    async function getTasks() {
        try {
            await axios.get(`${BASE_URL}/api/tasks`)
                .then((t) => {
                    setTasks(t.data)
                })
        } catch (error) {
            
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center mt-20">
            <section>
                <div className="border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">
                        <div>
                            <h1>Task Manager</h1>
                        </div>
                    </header>
                    <div className="flex flex-col mt-4">
                        <div>
                            <h2>Add Taks</h2>
                        </div>
                        <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <LabelForm htmlFor="name">Task Name</LabelForm>
                                <FormInput type="text" name="name" id="name" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col">
                                <LabelForm htmlFor="description">Description</LabelForm>
                                <textarea name="description" id="description" onChange={handleTextChange} />
                                <SpanError>{errorMsg}</SpanError>
                            </div>
                            <div className="flex items-center justify-between">
                                <FormButton type="submit" disabled={isLoading}>{isLoading ? "Adding" : "Add"}</FormButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <TaskList tasks={tasks}></TaskList>
            <Kanban tasks={tasks}></Kanban>
        </main>
    )
}