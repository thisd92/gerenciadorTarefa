'use client'
import { useState } from "react";
import axios from "axios";

import { UserLogin } from "./type";
import { BASE_URL } from "../../../utils/request";
import FormInput from "@/components/formInput/formInput";
import FormButton from "@/components/formButton/formButton";
import LabelForm from "@/components/labelForm/labelForm";
import SpanError from "@/components/spanError/spanError";

import Link from "next/link";

export default function Login() {
    const newUserLogin = {
        email: "",
        password: ""
    }

    const [userLogin, setUserLogin] = useState<UserLogin>(newUserLogin);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/api/usersLogin`, userLogin);
            if (response.status === 200) {
                window.location.href = "/taskManager";
            }
        } catch (error) {
            setErrorMsg("Invalid Email or Password")
            setTimeout(() => setErrorMsg(""), 2000)
            console.log(error)
        } finally {
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
                            <div className="flex flex-col">
                                <LabelForm htmlFor="email">E-mail</LabelForm>
                                <FormInput type="email" name="email" id="email" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col">
                                <LabelForm htmlFor="password">Password</LabelForm>
                                <FormInput type="password" name="password" id="password" onChange={handleChange} />
                                <SpanError>{errorMsg}</SpanError>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <FormButton type="submit" disabled={isLoading}>{isLoading ? "Signing In" : "Sign In"}</FormButton>
                                </div>
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