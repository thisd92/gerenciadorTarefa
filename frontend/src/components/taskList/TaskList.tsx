import { Task } from '@/app/taskManager/type';
import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../../utils/request';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {

    const [taskList, setTaskList] = useState<Task[]>([])

    async function handleCheckboxChange(taskId: string) {
        try {
          const updatedTasks = tasks.map((task) => {
            if (task._id === taskId) {
              const updatedTask = {
                ...task,
                isFinished: !task.isFinished
              };
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
                        {tasks.map((task) => (
                            <li key={task._id}>
                                <div className="flex flex-col border-2 border-stone-400 p-4">
                                    <span className="font-bold">Task: {task.name}</span>
                                    <span>Description: {task.description}</span>
                                    <div className="flex items-center mt-2">
                                        <span>Finished? </span>
                                        <input
                                            type="checkbox"
                                            name="isFinished"
                                            checked={task.isFinished}
                                            onChange={() => handleCheckboxChange(task._id)}
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
