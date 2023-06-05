import { Task } from '@/app/taskManager/type';
import React from 'react';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <section>
            <div className="border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                <header className="font-bold p-1">
                    <div>
                        <h2>Task List</h2>
                    </div>
                </header>
                <div className="flex flex-col mt-4">
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <div className='flex flex-col border-2 border-stone-400'>
                                    <span>Task: {task.name}</span>
                                    <span>Description: {task.description}</span>
                                    <div>
                                        <span>Finished? </span>
                                        <input type="checkbox" name="isFinished" checked={task.isFinished} readOnly />
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
