import Link from "next/link"

export const GetStarted = () => {
    return (
        <section className="hero bg-gray-600 text-white py-16">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Task Manager</h1>
                <p className="text-lg mb-8">Uma solução moderna para gerenciar suas tarefas de forma eficiente.</p>
                <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-semibold">
                    Comece agora
                </Link>
            </div>
        </section>

    )
}


export const TryNow = () => {
    return (
        <section className="cta bg-gray-600 text-white py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Experimente agora mesmo!</h2>
                <p className="text-lg mb-8">Comece a gerenciar suas tarefas de forma eficiente e alcance mais produtividade.</p>
                <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-semibold">
                    Crie sua conta
                </Link>
            </div>
        </section>
    )
}