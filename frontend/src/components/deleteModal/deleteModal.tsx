interface DeleteModalProps {
    taskName: string;
    deleteTask: () => void;
    closeModal: () => void;
}

export default function DeleteModal({ taskName, deleteTask, closeModal }: DeleteModalProps) {
    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center z-50">
            <div className="bg-gray-200 rounded-md p-6 shadow-lg">
                <p>Deseja realmente excluir a tarefa {taskName}?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="px-3 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={deleteTask}
                    >
                        Excluir
                    </button>
                    <button
                        className="px-3 py-2 text-gray-600 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}