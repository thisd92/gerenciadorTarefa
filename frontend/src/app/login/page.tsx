'use client'
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from "../../utils/request";
import { FormButton } from "@/components/buttons/Buttons";
import { UserLogin } from "./type";
import { FormInput } from "@/components/formInput/formInput";
import LabelForm from "@/components/labelForm/labelForm";
import SpanError from "@/components/spanError/spanError";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";

export default function Login() {
    const newUserLogin = {
        companyName: "",
        email: "",
        password: ""
    }

    const [userLogin, setUserLogin] = useState<UserLogin>(newUserLogin);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { setIsLogged, isLogged } = useContext(AuthContext); // Acessar a função setIsLogged do contexto

    const router = useRouter()

    useEffect(() => {
        if(isLogged) router.push('/project')
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/api/usersLogin`, userLogin, { withCredentials: true });
            if (response.status === 200) {
                setIsLogged(true)
                router.push(`/project`)
            }
        } catch (error) {
            setErrorMsg("Invalid Email or Password")
            setTimeout(() => setErrorMsg(""), 2000)
            console.log(error)
        } finally {
            setIsLoading(false);
        };
    }

    return (
        <main className="flex flex-grow flex-col items-center justify-center">
            <section>
                <div className="border-2 border-gray-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">Login</header>
                    <div className="flex flex-col mt-4">
                        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <LabelForm htmlFor="companyName">Company Name</LabelForm>
                                <FormInput type="text" name="companyName" id="companyName" onChange={handleChange} />
                            </div>
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
                                <Link className="inline-block align-baseline font-bold text-sm hover:text-green-700" href="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className=" flex items-center justify-center">
                                <p className="text-sm">Don&apos;t hava a account? <Link className="inline-block align-baseline font-bold text-sm hover:text-green-700" href="/register">Sign Up</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}