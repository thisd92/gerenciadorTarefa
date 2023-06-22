import { BsKanban, BsListCheck } from 'react-icons/bs'
import { FormButtonProps } from './type';
import { MdDeleteForever, MdEdit, MdOutlineAdd } from 'react-icons/md';

const size = 30

const FormButton = (props: FormButtonProps) => {
    return (
        <button className="bg-green-600 w-full shadow-md rounded-md hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
            {props.children}
        </button>
    )
}

const AddBtn = ({ active, onClick }: any) => {
    return (
        <button
            className={`${active ? 'bg-gray-400' : 'bg-gray-300'} shadow-gray-400 p-1 rounded-md shadow-md`}
            onClick={onClick}
        >
            <MdOutlineAdd size={size} />
        </button >
    )
}

const EditBtn = ({ active, onClick }: {active: any, onClick: () => void}) => {
    return (
        <button
            className={`p-1 rounded-md border border-gray-200 shadow-gray-400 shadow-md ${active ? 'bg-gray-500' : 'bg-gray-300'}`}
            onClick={onClick}
        >
            <MdEdit size={16} color='yellow' />
        </button >
    )
}

const DeleteBtn = ({ active, onClick }: any) => {
    return (
        <button
            className={`ml-1 p-1 rounded-md border border-gray-200 shadow-gray-400 shadow-md ${active ? 'bg-gray-500' : 'bg-gray-300'}`}
            onClick={onClick}
        >
            <MdDeleteForever size={16} color='red' />
        </button >
    )
}

const ListButton = ({ active, onClick }: any) => {
    return (
        <button
            className={`p-1 rounded-md shadow-gray-400 shadow-md ${active ? 'bg-gray-400' : 'bg-gray-300'}`}
            onClick={onClick}
        >
            <BsListCheck size={size} />
        </button>
    );
};

const KanbanButton = ({ active, onClick }: any) => {
    return (
        <button
            className={`p-1 rounded-md shadow-gray-400 shadow-md ${active ? 'bg-gray-400' : 'bg-gray-300'}`}
            onClick={onClick}
        >
            <BsKanban size={size} />
        </button>
    );
};

export { AddBtn, FormButton, ListButton, KanbanButton, EditBtn, DeleteBtn };