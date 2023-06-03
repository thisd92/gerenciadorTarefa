'use client'
import { useState } from "react";
import { User } from "./type";
import { BASE_URL } from "../../../utils/request";
import axios from "axios";
import PhoneInput from "@/components/PhoneInput/phoneInput";

type ValidatePass = {
    confirmPassword: string
}

export default function Register() {

    const newUser = {
        name: "",
        email: "",
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
    const [errorEmailMsg, setErrorEmailMsg] = useState('');

    function handleName(e: any) {
        const { name } = e.target;
        setUser({ ...user, [name]: e.target.value })
    }

    function handleEmail(e: any) {
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
        const valueWithoutMask = e.target.value.replace(/[^0-9]+/g, "");
        setUser({ ...user, [name]: valueWithoutMask })
    }

    async function sendRegister(e: React.FormEvent) {
        e.preventDefault()
        if (verifyPass()) {
            try {
                await axios.post(`${BASE_URL}/api/user`, user);
                console.log(user)
                setUser(newUser)
                setConfirmPassword(confirmaPassword)
                alert("Conta Cadastrada")
            } catch (error) {
                setErrorEmailMsg("Email is already in use")
                setTimeout(() => setErrorEmailMsg(""), 2000)
                console.log(error)
            };
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center mt-20">
            <section className="lg:w-3/12 md:w-2/6">
                <div className="border-2 border-slate-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">Create Account</header>
                    <div className="flex flex-col mt-4">
                        <form className="flex flex-col gap-3" onSubmit={sendRegister}>
                            <div className="">
                                <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="name">Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text" name="name" id="name" value={user.name} onChange={handleName} required />
                            </div>
                            <div className="">
                                <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="email">E-mail</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="email" name="email" id="email" value={user.email} onChange={handleEmail} required />
                                <span className="text-red-600">{errorEmailMsg}</span>
                            </div>
                            <div className="">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="password" name="password" id="password" value={user.password} onChange={handlePassword} onBlur={handlePassword} required />
                            </div>
                            <div className="">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword.confirmPassword} onChange={handleConfirm} onBlur={verifyPass} required />
                                <span className="text-red-600">{errorMsg}</span>
                            </div>
                            <div className="">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth">Birth</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="date" name="birth" id="birth" value={user.birth} onChange={handleBirth} required />
                            </div>
                            <div className="">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">Tel</label>
                                <PhoneInput name="tel" id="tel" value={user.tel} onChange={handleTel} type="tel" required />
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-green-600 w-full shadow-md rounded-md hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}