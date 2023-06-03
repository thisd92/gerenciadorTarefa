'use client'
import Link from "next/link";
import { useState } from "react";
import { UserLogin } from "./type";
import { BASE_URL } from "../../../utils/request";
import axios from "axios";

export default function Login() {

    const newUserLogin = {
        email: "",
        password: ""
    }

    const [userLogin, setUserLogin] = useState<UserLogin>(newUserLogin);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o indicador de carregamento


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name } = e.target;
        setUserLogin({ ...userLogin, [name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setIsLoading(true); // Ativar o indicador de carregamento
            const response = await axios.post(`${BASE_URL}/api/usersLogin`, userLogin);
            if (response.status === 200) {
                window.location.href = "/taskManager";
            }
        } catch (error) {
            setErrorMsg("Invalid Email or Password")
            setTimeout(() => setErrorMsg(""), 2000)
            console.log(error)
        }finally{
            setIsLoading(false);
        };
        console.log(userLogin)
    }

    return (
        <main className="flex min-h-screen flex-col items-center mt-48">
            <section>
                <div className="border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">Login</header>
                    <div className="flex flex-col mt-4">
                        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="email">E-mail</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="email" name="email" id="email" value={userLogin.email} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="password" name="password" id="password" value={userLogin.password} onChange={handleChange} />
                                <span className="text-red-600">{errorMsg}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-green-600 shadow-md rounded-md hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" 
                                type="submit" disabled={isLoading} >{isLoading ? "Signing In" : "Sign In" }</button>
                                <Link className="inline-block align-baseline font-bold text-sm hover:text-green-700" href="#">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className=" flex items-center justify-center">
                                <p className="text-sm">Dont hava a account? <Link className="inline-block align-baseline font-bold text-sm hover:text-green-700" href="/register">Sign Up</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}