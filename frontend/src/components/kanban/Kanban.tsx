import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '@/app/taskManager/type';
import axios from 'axios';

const BASE_URL = 'http://localhost:8090';

interface KanbanProps {
    tasks: Task[];
}

const Kanban: React.FC<KanbanProps> = ({ tasks }) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks);

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);

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

            const updatedTaskData = {
                name: movedTask.name,
                description: movedTask.description,
                toDo: newStatus === 'toDo',
                isInProgress: newStatus === 'inProgress',
                isFinished: newStatus === 'finished',
            };

            await axios.put(`${BASE_URL}/api/tasks/${_id}`, updatedTaskData);
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
                        case 'toDo':
                            return { ...task, toDo: true, isInProgress: false, isFinished: false };
                        case 'inProgress':
                            return { ...task, toDo: false, isInProgress: true, isFinished: false };
                        case 'finished':
                            return { ...task, toDo: false, isInProgress: false, isFinished: true };
                        default:
                            return task;
                    }
                }
                return task;
            });

            setTaskList(updatedTasks);

            await axios.put(`${BASE_URL}/api/tasks/${taskId}`, { status: newStatus });
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <section className="w-2/4 border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-row gap-4">
                    <Droppable droppableId="toDo">
                        {(provided) => (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl text-center font-bold mb-2">To Do</h2>
                                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                                    {taskList.filter((task) => task.toDo).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id ?? ""} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-gray-200 p-4 rounded-md"
                                                >
                                                    <p>{task.name}</p>
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
                                <h2 className="text-xl text-center font-bold mb-2">In Progress</h2>
                                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                                    {taskList.filter((task) => task.isInProgress).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id ?? ""} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-yellow-200 p-4 rounded-md"
                                                >
                                                    <p>{task.name}</p>
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
                                <h2 className="text-xl text-center font-bold mb-2">Finished</h2>
                                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                                    {taskList.filter((task) => task.isFinished).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id ?? ''} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-green-200 p-4 rounded-md"
                                                >
                                                    <p>{task.name}</p>
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
        </section>
    );
};

export default Kanban;