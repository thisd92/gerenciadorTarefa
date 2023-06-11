import { BASE_URL } from "@/utils/request";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface ValidateProps{
    router: AppRouterInstance
}

export const validateToken = async ( {router}: ValidateProps) => {
    try {
        const token = getCookie('authorization', {})

        if (!token) throw new Error("Token Inválido!")
        await axios.get(`${BASE_URL}/api/home`, {
            headers: {
                Authorization: `${token}` // Envia o token no header Authorization
            },
        });
    } catch (error) {
        router.push('/login');
    }
};