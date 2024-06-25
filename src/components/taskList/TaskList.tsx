import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

import { BASE_URL } from '@/utils/request';
import { getToken } from '@/services/auth';
import { Task } from '@/components/taskManager/type';
import TaskItem from '../taskItem/TaskItem';
import { TaskContext } from '@/Context/TaskContext';

interface TaskLisProps {
    projectId: string
}

const TaskList = ({ projectId }: TaskLisProps) => {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);

    const { tasks } = useContext(TaskContext)

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = taskList.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = Math.ceil(taskList.length / tasksPerPage);
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
                            console.log(updatedTask)
                            break;
                        case "isInProgress":
                            updatedTask = {
                                ...task,
                                toDo: false,
                                isInProgress: true,
                                isFinished: false
                            };
                            console.log(updatedTask)
                            break;
                        case "isFinished":
                            updatedTask = {
                                ...task,
                                toDo: false,
                                isInProgress: false,
                                isFinished: true
                            };
                            console.log(updatedTask)
                            break;
                        default:
                            updatedTask = task;
                            break;
                    }

                    axios.put(`${BASE_URL}/api/tasks/${taskId}`, updatedTask, {
                        headers: {
                            Authorization: `${getToken()}`
                        }
                    });
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

    const toggleExpandTask = (taskId: string) => {
        if (expandedTasks.includes(taskId)) {
            setExpandedTasks([]);
        } else {
            setExpandedTasks([taskId]);
        }
    };

    return (
        <section className="w-2/4">
            <div className="border-2 border-gray-300 rounded-md shadow-lg pt-6 pb-8 mb-4">
                <header className="flex font-bold p-1 justify-center">
                    <div>
                        <h1 className='font-bold'>Task List</h1>
                    </div>
                </header>
                <div className="flex flex-col mt-4">
                    <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 p-2 shadow-lg min-h-[430px]">
                        {currentTasks.map((task, index) => (
                            <TaskItem
                                index={index}
                                key={task._id}
                                task={task}
                                expanded={expandedTasks.includes(task._id ?? '')}
                                projectId={projectId}
                                onToggleExpand={toggleExpandTask}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center mt-4">{pagination}</div>
            </div>
        </section>

    );
};

export default TaskList;
