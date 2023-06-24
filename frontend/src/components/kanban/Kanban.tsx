import React, { useEffect, useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';

import { Task } from '@/components/taskManager/type';
import { BASE_URL } from '../../utils/request';
import { getToken } from '@/services/auth';
import { TaskContext } from '@/Context/TaskContext';

interface KanbanProps {
    projectId: string
}

const Kanban = ({ projectId }: KanbanProps) => {

    const { tasks, getTasks } = useContext(TaskContext)

    const [taskList, setTaskList] = useState<Task[]>(tasks);

    useEffect(() => {
        setTaskList(tasks); // Atualiza o quadro quando houver alteração nas tarefas
    }, [tasks]);

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const updatedTasks = Array.from(taskList);
        const movedTask = updatedTasks.splice(source.index, 1)[0];
        updatedTasks.splice(destination.index, 0, movedTask);

        const taskIdDrag = result.draggableId;
        const mvTask = await axios.get(`${BASE_URL}/api/tasks/${taskIdDrag}`, {
            headers: {
                Authorization: `${getToken()}`
            }
        })
        const taskMoved = mvTask.data;

        setTaskList(updatedTasks);

        try {
            const taskId = movedTask._id || movedTask._id;
            if (!taskId) {
                console.error('Task ID not found.');
                return;
            }
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
                ...taskMoved,
                toDo: newStatus === 'toDo',
                isInProgress: newStatus === 'inProgress',
                isFinished: newStatus === 'finished',
            };

            await axios.put(`${BASE_URL}/api/tasks/${taskIdDrag}`, updatedTaskData, {
                headers: {
                    Authorization: `${getToken()}`
                }
            });
            getTasks(projectId);
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const renderTaskItems = (taskList: Task[], className: string) =>
        taskList.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id ?? ''} index={index} data-task-id={task._id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={className}
                    >
                        <p>{task.name}</p>
                    </div>
                )}
            </Draggable>
        ));

    return (
        <section className="w-3/4 h-full border-2 border-gray-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-6">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-row gap-4 justify-around">
                    <div className='w-1/3'>
                        <Droppable droppableId="toDo">
                            {(provided) => (
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl text-center font-bold mb-2">To Do</h2>
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                                        {renderTaskItems(taskList.filter((task) => task.toDo), 'bg-blue-200 p-4 rounded-md')}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className='w-1/3'>
                        <Droppable droppableId="inProgress">
                            {(provided) => (
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl text-center font-bold mb-2">In Progress</h2>
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                                        {renderTaskItems(taskList.filter((task) => task.isInProgress), 'bg-yellow-200 p-4 rounded-md')}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className='w-1/3'>
                        <Droppable droppableId="finished">
                            {(provided) => (
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl text-center font-bold mb-2">Finished</h2>
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                                        {renderTaskItems(taskList.filter((task) => task.isFinished), 'bg-green-200 p-4 rounded-md')}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </section>
    );
};

export default Kanban;
