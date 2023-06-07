import { Task } from '@/app/taskManager/type';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../utils/request';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);

    async function handleCheckboxChange(taskId: string, property: keyof Task) {
        try {
            const updatedTasks = taskList.map((task) => {
                if (task._id === taskId) {
                    let updatedTask: Task;

                    // Update the target property to true and set other properties to false
                    switch (property) {
                        case "toDo":
                            updatedTask = {
                                ...task,
                                toDo: true,
                                isInProgress: false,
                                isFinished: false
                            };
                            break;
                        case "isInProgress":
                            updatedTask = {
                                ...task,
                                toDo: false,
                                isInProgress: true,
                                isFinished: false
                            };
                            break;
                        case "isFinished":
                            updatedTask = {
                                ...task,
                                toDo: false,
                                isInProgress: false,
                                isFinished: true
                            };
                            break;
                        default:
                            updatedTask = task;
                            break;
                    }

                    axios.put(`${BASE_URL}/api/tasks/${taskId}`, updatedTask);
                    return updatedTask;
                }

                return task;
            });

            setTaskList(updatedTasks);
            console.log("Task updated successfully");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    return (
        <section className="w-2/6">
            <div className="border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                <header className="font-bold p-1">
                    <div>
                        <h2>Task List</h2>
                    </div>
                </header>
                <div className="flex flex-col mt-4">
                    <ul>
                        {taskList.map((task) => (
                            <li key={task._id}>
                                <div className="flex flex-col border-2 border-stone-400 p-4">
                                    <span className="font-bold">Task: {task.name}</span>
                                    <span>Description: {task.description}</span>
                                    <div className="flex items-center mt-2">
                                        <span>To Do </span>
                                        <input
                                            type="checkbox"
                                            name="toDo"
                                            checked={task.toDo}
                                            onChange={() => task._id && handleCheckboxChange(task._id, "toDo")}
                                            className="ml-2"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span>In Progress? </span>
                                        <input
                                            type="checkbox"
                                            name="isInProgress"
                                            checked={task.isInProgress}
                                            onChange={() => task._id && handleCheckboxChange(task._id, "toDo")}
                                            className="ml-2"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span>Finished </span>
                                        <input
                                            type="checkbox"
                                            name="isFinished"
                                            checked={task.isFinished}
                                            onChange={() => task._id && handleCheckboxChange(task._id, "isFinished")}
                                            className="ml-2"
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default TaskList;
