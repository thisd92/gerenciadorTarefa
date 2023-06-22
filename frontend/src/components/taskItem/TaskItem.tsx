import { useState } from "react";
import axios from "axios";

import { getToken } from "@/services/auth";
import { BASE_URL } from "@/utils/request";

import { DeleteBtn, EditBtn } from "../buttons/Buttons";
import { Task } from "@/app/project/taskManager/type";
import EditTask from "../editTask/EditTask";
import { useRouter } from "next/navigation";

interface TaskItemProps {
    index: number
    task: Task;
    expanded: boolean;
    onToggleExpand: (taskId: string) => void;
    onCheckboxChange: (taskId: string, property: keyof Task) => void;
    getTasks: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    index,
    task,
    expanded,
    onToggleExpand,
    onCheckboxChange,
    getTasks,
}) => {

    const [editTask, setEditTask] = useState(false)

    const handleEditTask = () => {
        setEditTask(!editTask)
    }

    const deleteTask = async () => {
        try {
            await axios.delete(`${BASE_URL}/api/tasks/${task._id}`, {
                headers: {
                    Authorization: `${getToken()}`
                }
            })
            getTasks()
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <li key={task._id}
                className={`${index % 2 === 0 ? 'bg-stone-300' : 'bg-stone-200'}`} >
                <div className="flex flex-col p-2 cursor-pointer">
                    <div className="flex flex-row justify-between">
                        <div>
                            <span onClick={() => onToggleExpand(task._id ?? '')} className="font-bold">
                                Name: {task.name}
                            </span>
                        </div>
                        <div className="flex flex-row items-center">
                            <EditBtn active={editTask} onClick={handleEditTask} />
                            <DeleteBtn onClick={deleteTask} />
                        </div>

                    </div>
                    {expanded && (
                        <>
                            <span>Description: {task.description}</span>
                            <div className="flex items-center">
                                <span>To Do </span>
                                <input
                                    type="checkbox"
                                    name="toDo"
                                    checked={task.toDo}
                                    onChange={() => task._id && onCheckboxChange(task._id, 'toDo')}
                                    className="ml-2"
                                />
                            </div>
                            <div className="flex items-center">
                                <span>In Progress? </span>
                                <input
                                    type="checkbox"
                                    name="isInProgress"
                                    checked={task.isInProgress}
                                    onChange={() => task._id && onCheckboxChange(task._id, "isInProgress")}
                                    className="ml-2"
                                />
                            </div>
                            <div className="flex items-center">
                                <span>Finished </span>
                                <input
                                    type="checkbox"
                                    name="isFinished"
                                    checked={task.isFinished}
                                    onChange={() => task._id && onCheckboxChange(task._id, "isFinished")}
                                    className="ml-2"
                                />
                            </div>
                        </>
                    )}
                </div>
            </li>
            <div>
                {editTask && <EditTask taskId={task._id ?? ""} getTasks={getTasks} handleEditTask={handleEditTask} />}
            </div>
        </>
    )
}

export default TaskItem;