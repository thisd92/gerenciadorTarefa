import { Task } from "@/components/taskManager/type";
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
                {tasks.map((task, index) => (
                    <li key={task._id} className={`mb-1 p-1 rounded-md ${index % 2 === 0 ? 'bg-stone-200' : 'bg-stone-100'}`}>
                        {task.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskCard;
