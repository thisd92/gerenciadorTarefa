import { BsListTask } from "react-icons/bs";
import { GrTasks } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";

const Features = () => {
    return (
        <section className="features bg-gray-200 py-12">
            <div className="container mx-auto grid grid-cols-3 gap-8">
                <div className="feature-card text-center">
                    <div className="feature-icon flex items-center justify-center">
                        <BsListTask />
                    </div>
                    <h2 className="text-xl font-bold mb-4">Organize suas tarefas</h2>
                    <p className="text-gray-700">Crie e gerencie suas tarefas de forma intuitiva e organizada.</p>
                </div>
                <div className="feature-card text-center">
                    <div className="feature-icon flex items-center justify-center">
                        <GrTasks />
                    </div>
                    <h2 className="text-xl font-bold mb-4">Acompanhe o progresso</h2>
                    <p className="text-gray-700">Acompanhe o progresso das suas tarefas e saiba o que está pendente, em andamento ou concluído.</p>
                </div>
                <div className="feature-card text-center">
                    <div className="feature-icon flex items-center justify-center">
                        <RiTeamFill />
                    </div>
                    <h2 className="text-xl font-bold mb-4">Colaboração em equipe</h2>
                    <p className="text-gray-700">Trabalhe em equipe, atribua tarefas, comente e mantenha todos atualizados.</p>
                </div>
            </div>
        </section>
    );
};

export default Features;