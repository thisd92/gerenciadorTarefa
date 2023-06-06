import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '@/app/taskManager/type';
import axios from 'axios';

interface KanbanProps {
    tasks: Task[];
}

const Kanban: React.FC<KanbanProps> = ({ tasks }) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks);

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const updatedTasks = Array.from(taskList);
        const movedTask = updatedTasks[source.index];
        updatedTasks.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, movedTask);

        setTaskList(updatedTasks);

        try {
            const { _id } = movedTask;
            let newStatus: string;

            if (destination.droppableId === 'toDo') {
                newStatus = 'toDo';
            } else if (destination.droppableId === 'inProgress') {
                newStatus = 'inProgress';
            } else if (destination.droppableId === 'finished') {
                newStatus = 'finished';
            } else {
                return;
            }

            const updatedTask = { ...movedTask, status: newStatus };

            await axios.put(`/api/tasks/${_id}`, updatedTask);
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleStatusChange = async (taskId: string, newStatus: string) => {
        try {
            const updatedTasks = taskList.map((task) => {
                if (task._id === taskId) {
                    switch (newStatus) {
                        case "toDo":
                            return { ...task, toDo: true, isInProgress: false, isFinished: false };
                        case "inProgress":
                            return { ...task, toDo: false, isInProgress: true, isFinished: false };
                        case "finished":
                            return { ...task, toDo: false, isInProgress: false, isFinished: true };
                        default:
                            return task;
                    }
                }
                return task;
            });

            setTaskList(updatedTasks);

            // Atualiza o status da tarefa no banco de dados
            await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
            console.log("Task updated successfully");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-row gap-4">
                <Droppable droppableId="toDo">
                    {(provided) => (
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold mb-2">To Do</h2>
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {taskList
                                    .filter((task) => task.toDo)
                                    .map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-gray-200 p-4 rounded-md"
                                                >
                                                    <p>{task.name}</p>
                                                    <button
                                                        onClick={() => handleStatusChange(task._id, 'inProgress')}
                                                        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded-md"
                                                    >
                                                        Start
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="inProgress">
                    {(provided) => (
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold mb-2">In Progress</h2>
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {taskList
                                    .filter((task) => task.isInProgress)
                                    .map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-yellow-200 p-4 rounded-md"
                                                >
                                                    <p>{task.name}</p>
                                                    <button
                                                        onClick={() => handleStatusChange(task._id, 'toDo')}
                                                        className="mt-2 px-2 py-1 bg-gray-500 text-white rounded-md"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(task._id, 'finished')}
                                                        className="mt-2 px-2 py-1 bg-green-500 text-white rounded-md"
                                                    >
                                                        Finish
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="finished">
                    {(provided) => (
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold mb-2">Finished</h2>
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {taskList
                                    .filter((task) => task.isFinished)
                                    .map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-green-200 p-4 rounded-md"
                                                >
                                                    <p>{task.name}</p>
                                                    <button
                                                        onClick={() => handleStatusChange(task._id, 'inProgress')}
                                                        className="mt-2 px-2 py-1 bg-yellow-500 text-white rounded-md"
                                                    >
                                                        Undo
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default Kanban;
