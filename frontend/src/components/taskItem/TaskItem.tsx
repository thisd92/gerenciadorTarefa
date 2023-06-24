import { useState, useContext } from "react";
import axios from "axios";

import { getToken } from "@/services/auth";
import { BASE_URL } from "@/utils/request";

import { DeleteBtn, EditBtn } from "../buttons/Buttons";
import { Task } from "@/components/taskManager/type";
import EditTask from "../editTask/EditTask";
import { TaskContext } from "@/Context/TaskContext";
import DeleteModal from "../deleteModal/deleteModal";

interface TaskItemProps {
    index: number
    task: Task;
    expanded: boolean;
    projectId: string;
    onToggleExpand: (taskId: string) => void;
    onCheckboxChange: (taskId: string, property: keyof Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    index,
    task,
    expanded,
    projectId,
    onToggleExpand,
    onCheckboxChange,
}) => {

    const [editTask, setEditTask] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const { getTasks } = useContext(TaskContext)

    const handleEditTask = () => {
        setEditTask(!editTask)
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const deleteTask = async () => {
        try {
            await axios.delete(`${BASE_URL}/api/tasks/${task._id}`, {
                headers: {
                    Authorization: `${getToken()}`
                }
            })
            getTasks(projectId)
            setShowDeleteModal(false)
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
                               {task.name}
                            </span>
                        </div>
                        <div className="flex flex-row items-center">
                            <EditBtn active={editTask} onClick={handleEditTask} />
                            <DeleteBtn onClick={handleDeleteClick} />
                        </div>

                    </div>
                    {expanded && (
                        <>
                            <span className="text-justify">{task.description}</span>
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
                {editTask && <EditTask projectId={projectId} taskId={task._id ?? ""}
                    handleEditTask={handleEditTask} />}
                {showDeleteModal && <DeleteModal
                    taskName={task.name}
                    deleteTask={deleteTask}
                    closeModal={() => setShowDeleteModal(false)}
                />}
            </div>
        </>
    )
}

export default TaskItem;