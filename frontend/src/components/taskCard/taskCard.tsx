import { Task } from "@/app/taskManager/type";
import React from "react";

interface TaskCardProps {
    tasks: Task[];
    title: string;
}

const TaskCard = ({ title, tasks }: TaskCardProps) => {
    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="mb-2">
                        {task.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskCard;
