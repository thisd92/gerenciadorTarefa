'use client'
import Link from "next/link";
import { useState } from "react";
import { User } from "./type";
import { BASE_URL } from "../../../utils/request";
import axios from "axios";

export default function Login() {

    const [user, setUser] = useState<User>();
    
    function sendUser(){
        axios.post(`${BASE_URL}/login`, user);
    }

    return (
        <main className="flex min-h-screen flex-col items-center mt-48">
            <section>
                <div className="border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">Login</header>
                    <div className="flex flex-col mt-4">
                        <form onSubmit={sendUser}>
                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="username">Username or e-mail</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                type="text" name="username" id="username" />
                            </div>
                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                type="password" name="password" id="password" />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <button className="bg-green-600 shadow-md rounded-md hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
                                <Link className="inline-block align-baseline font-bold text-sm hover:text-green-700" href="#">
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
            <a href=""></a>
        </main>
    )
}