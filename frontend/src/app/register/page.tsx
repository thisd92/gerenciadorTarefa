'use client'
import { useState } from "react";
import { User } from "./type";
import { BASE_URL } from "../../../utils/request";
import axios from "axios";
import PhoneInput from "@/components/phoneInput/phoneInput";
import FormInput from "@/components/formInput/formInput";
import FormButton from "@/components/formButton/formButton";
import LabelForm from "@/components/labelForm/labelForm";
import SpanError from "@/components/spanError/spanError";

interface ValidatePass {
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

    const confirmPass = {
        confirmPassword: ""
    }

    const [user, setUser] = useState<User>(newUser);
    const [confirmPassword, setConfirmPassword] = useState<ValidatePass>(confirmPass);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorEmailMsg, setErrorEmailMsg] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name } = e.target;
        setUser({ ...user, [name]: e.target.value })
    }

    function handleConfirm(e: React.ChangeEvent<HTMLInputElement>) {
        const { name } = e.target;
        setConfirmPassword({ ...confirmPassword, [name]: e.target.value })
    }

    function verifyPass() {
        console.log(user.password + " " + confirmPassword.confirmPassword)
        if (user.password === confirmPassword.confirmPassword) {
            return true
        } else {
            setErrorMsg("Password doesn't match")
            setTimeout(() => setErrorMsg(""), 2000)
            return false
        }
    }

    function handleTel(e: React.ChangeEvent<HTMLInputElement>) {
        const { name } = e.target;
        const valueWithoutMask = e.target.value.replace(/[^0-9]+/g, "");
        setUser({ ...user, [name]: valueWithoutMask })
    }

    function resetValues() {
        setUser(newUser)
        setConfirmPassword(confirmPass)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (verifyPass()) {
            try {
                await axios.post(`${BASE_URL}/api/user`, user);
                resetValues()
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
                        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                            <div className="">
                                <LabelForm htmlFor="name">Name</LabelForm>
                                <FormInput type="text" name="name" id="name" onChange={handleChange} required />
                            </div>
                            <div className="">
                                <LabelForm htmlFor="email">E-mail</LabelForm>
                                <FormInput type="email" name="email" id="email" onChange={handleChange} required />
                                <SpanError>{errorEmailMsg}</SpanError>
                            </div>
                            <div className="">
                                <LabelForm htmlFor="password">Password</LabelForm>
                                <FormInput type="password" name="password" id="password" onChange={handleChange} onBlur={handleChange} required />
                            </div>
                            <div className="">
                                <LabelForm htmlFor="confirmPassword">Confirm Password</LabelForm>
                                <FormInput type="password" name="confirmPassword" id="confirmPassword" onChange={handleConfirm} onBlur={verifyPass} required />
                                <SpanError>{errorMsg}</SpanError>
                            </div>
                            <div className="">
                                <LabelForm htmlFor="birth">Birth</LabelForm>
                                <FormInput type="date" name="birth" id="birth" onChange={handleChange} required />
                            </div>
                            <div className="">
                                <LabelForm htmlFor="tel">Tel</LabelForm>
                                <PhoneInput name="tel" id="tel" value={user.tel} onChange={handleTel} type="tel" required />
                            </div>
                            <div className="flex items-center justify-center">
                                <FormButton type="submit">Sign Up</FormButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}