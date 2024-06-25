'use client'
import { useState, useRef } from "react";
import axios from "axios";

import { User, ValidatePass } from "./type";
import { BASE_URL } from "../../utils/request";
import { FormButton } from "@/components/buttons/Buttons";
import PhoneInput from "@/components/phoneInput/phoneInput";
import { FormInput } from "@/components/formInput/formInput";
import LabelForm from "@/components/labelForm/labelForm";
import SpanError from "@/components/spanError/spanError";

export default function Register() {

    const newUser = {
        name: "",
        email: "",
        companyName: "",
        password: "",
        birth: "",
        tel: "",
        role: "user"
    }

    const confirmPass = {
        confirmPassword: ""
    }

    const [user, setUser] = useState<User>(newUser);
    const [confirmPassword, setConfirmPassword] = useState<ValidatePass>(confirmPass);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorEmailMsg, setErrorEmailMsg] = useState('');
    const formRef = useRef<HTMLFormElement>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    function handleConfirm(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setConfirmPassword({ ...confirmPassword, [name]: value })
    }

    function verifyPass() {
        if (user.password === confirmPassword.confirmPassword) {
            return true
        } else {
            setErrorMsg("Password doesn't match")
            setTimeout(() => setErrorMsg(""), 2000)
            return false
        }
    }

    function handleTel(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const valueWithoutMask = value.replace(/[^0-9]+/g, "");
        setUser({ ...user, [name]: valueWithoutMask })
    }

    function resetValues() {
        setUser(newUser)
        setConfirmPassword(confirmPass)
        if (formRef.current) formRef.current.reset()
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (verifyPass()) {
            try {
                await axios.post(`${BASE_URL}/api/user`, user);
                resetValues()
                alert("User Created")
            } catch (error) {
                setErrorEmailMsg("Email is already in use")
                setTimeout(() => setErrorEmailMsg(""), 2000)
                console.log(error)
            };
        }
    }

    return (
        <main className="flex flex-grow flex-col items-center mt-8">
            <section>
                <div className="border-2 border-gray-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">Create Account</header>
                    <div className="flex flex-col mt-4">
                        <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <div>
                                <LabelForm htmlFor="name">Name</LabelForm>
                                <FormInput type="text" name="name" id="name" onChange={handleChange} required />
                            </div>
                            <div className="flex flex-col">
                                <LabelForm htmlFor="email">E-mail</LabelForm>
                                <FormInput type="email" name="email" id="email" onChange={handleChange} required />
                                <SpanError>{errorEmailMsg}</SpanError>
                            </div>
                            <div>
                                <LabelForm htmlFor="companyName">Company Name</LabelForm>
                                <FormInput type="text" name="companyName" id="companyName" onChange={handleChange} required />
                            </div>
                            <div>
                                <LabelForm htmlFor="password">Password</LabelForm>
                                <FormInput type="password" name="password" id="password" onChange={handleChange} onBlur={handleChange} required />
                            </div>
                            <div className="flex flex-col">
                                <LabelForm htmlFor="confirmPassword">Confirm Password</LabelForm>
                                <FormInput type="password" name="confirmPassword" id="confirmPassword" onChange={handleConfirm} onBlur={verifyPass} required />
                                <SpanError>{errorMsg}</SpanError>
                            </div>
                            <div>
                                <LabelForm htmlFor="birth">Birth</LabelForm>
                                <FormInput type="date" name="birth" id="birth" onChange={handleChange} required />
                            </div>
                            <div>
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