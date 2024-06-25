'use client'
import { useState } from "react";

import { FormInput } from "@/components/formInput/formInput";
import LabelForm from "@/components/labelForm/labelForm";

export default function ForgotPassword() {

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setEmail(value)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()


    }

    return (
        <main className="flex flex-grow flex-col items-center justify-center">
            <section>
                <div className="border-2 border-gray-300 rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
                    <header className="font-bold p-1">Login</header>
                    <div className="flex flex-col mt-4">
                        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <LabelForm htmlFor="email">E-mail</LabelForm>
                                <FormInput type="email" name="email" id="email" onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}