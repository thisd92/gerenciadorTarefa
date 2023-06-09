import { BsKanban, BsListCheck } from 'react-icons/bs'
import { FormButtonProps } from './type';
import { MdOutlineAdd } from 'react-icons/md';

const size = 30

const FormButton = (props: FormButtonProps) => {
    return (
        <button className="bg-green-600 w-full shadow-md rounded-md hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
            {props.children}
        </button>
    )
}

const AddTaskBtn = ({ active, onClick }: any) => {
    return (
        <button
            className={`${active ? 'bg-gray-400' : 'bg-gray-300'} p-1 rounded-md border-2 border-gray-400`}
            onClick={onClick}
        >
            <MdOutlineAdd size={size} />
        </button >
    )
}

const ListButton = ({ active, onClick }: any) => {
    return (
        <button
            className={`p-1 rounded-md border-2 border-gray-400 ${active ? 'bg-gray-400' : 'bg-gray-300'}`}
            onClick={onClick}
        >
            <BsListCheck size={size} />
        </button>
    );
};

const KanbanButton = ({ active, onClick }: any) => {
    return (
        <button
            className={`p-1 rounded-md border-2 border-gray-400 ${active ? 'bg-gray-400' : 'bg-gray-300'}`}
            onClick={onClick}
        >
            <BsKanban size={size} />
        </button>
    );
};

export { AddTaskBtn, FormButton, ListButton, KanbanButton };