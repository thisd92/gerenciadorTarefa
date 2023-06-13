import { BASE_URL } from "@/utils/request";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface ValidateProps{
    router: AppRouterInstance;
    onLoginSuccess: () => void
}

interface AuthProps{
    router: AppRouterInstance;
}

export const validateToken = async ( {router, onLoginSuccess}: ValidateProps) => {
    try {
        const token = getCookie('authorization', {})

        if (!token) throw new Error("Token Inválido!")
        await axios.get(`${BASE_URL}/api/protected`, {
            headers: {
                Authorization: `${token}` // Envia o token no header Authorization
            },
        });
        onLoginSuccess()
    } catch (error) {
        router.push('/login');
    }
};
export const authToken = async ( {router}: AuthProps) => {
    try {
        const token = getCookie('authorization', {})

        if (!token) throw new Error("Token Inválido!")
        await axios.get(`${BASE_URL}/api/protected`, {
            headers: {
                Authorization: `${token}` // Envia o token no header Authorization
            },
        });
    } catch (error) {
        router.push('/login');
    }
};

export const getToken = () => {
    try {
        const token = getCookie('authorization')
        return token
    } catch (error) {
        console.log(error)
    }
}