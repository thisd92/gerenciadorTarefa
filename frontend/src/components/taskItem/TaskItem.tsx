import { Task } from "@/app/taskManager/type";

interface TaskItemProps {
    index: number
    task: Task;
    expanded: boolean;
    onToggleExpand: (taskId: string) => void;
    onCheckboxChange: (taskId: string, property: keyof Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    index,
    task,
    expanded,
    onToggleExpand,
    onCheckboxChange,
}) => {
    return (
        <li key={task._id}
            className={`${index % 2 === 0 ? 'bg-stone-300' : 'bg-stone-200'}`} >
            <div className="flex flex-col p-2 cursor-pointer">
                <span onClick={() => onToggleExpand(task._id ?? '')} className="font-bold">
                    Name: {task.name}
                </span>
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
    )
}

export default TaskItem;