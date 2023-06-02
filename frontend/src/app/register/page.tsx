'use client'
import Link from "next/link";
import { useState } from "react";
import { User } from "./type";
import { BASE_URL } from "../../../utils/request";
import axios from "axios";

type ValidatePass = {
    confirmPassword: string
}

export default function Register() {

    const newUser = {
        username: "",
        password: "",
        birth: "",
        tel: ""
    }

    const confirmaPassword = {
        confirmPassword: ""
    }

    const [user, setUser] = useState<User>(newUser);
    const [confirmPassword, setConfirmPassword] = useState<ValidatePass>(confirmaPassword);
    const [errorMsg, setErrorMsg] = useState('');

    function handleUsername(e: any) {
        const { name } = e.target;
        setUser({ ...user, [name]: e.target.value })
    }

    function handlePassword(e: any) {
        const { name } = e.target;
        setUser({ ...user, [name]: e.target.value })
        console.log(user)
    }

    function handleConfirm(e: any) {
        const { name } = e.target;
        setConfirmPassword({ ...confirmPassword, [name]: e.target.value })
        console.log(confirmPassword)
    }

    function verifyPass() {
        console.log(user.password + " " + confirmPassword.confirmPassword)
        if (user.password == confirmPassword.confirmPassword) {
            return true
        } else {
            setErrorMsg("Password doesn't match")
            setTimeout(() => setErrorMsg(""), 2000)
            return false
        }
    }

    function handleBirth(e: any) {
        const { name } = e.target;
        setUser({ ...user, [name]: e.target.value })
    }

    function handleTel(e: any) {
        const { name } = e.target;
        setUser({ ...user, [name]: e.target.value })
    }


    function sendRegister(e: React.FormEvent) {
        e.preventDefault()
        if(verifyPass()){
            axios.post(`${BASE_URL}/api/user`, user);
            console.log(user)
            setUser(newUser)
            setConfirmPassword(confirmaPassword)
            alert("Conta Cadastrada")
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center mt-36">
            <section className="w-1/5">
                <div className="border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">Create Account</header>
                    <div className="flex flex-col mt-4">
                        <form onSubmit={sendRegister}>
                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="username">Username</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text" name="username" id="username" value={user.username} onChange={handleUsername} />
                            </div>
                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="password" name="password" id="password" value={user.password} onChange={handlePassword} onBlur={handlePassword} />
                            </div>
                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword.confirmPassword} onChange={handleConfirm} onBlur={verifyPass} />
                                    <span>{errorMsg}</span>
                            </div>
                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth">Birth</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="date" name="birth" id="birth" value={user.birth} onChange={handleBirth} />
                            </div>
                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">Tel</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="phone" name="tel" id="tel" value={user.tel} onChange={handleTel} />
                            </div>
                            <div className="mt-4 flex items-center justify-center">
                                <button className="bg-green-600 w-full shadow-md rounded-md hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}