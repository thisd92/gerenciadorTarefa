import { deleteCookie } from "cookies-next"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

interface LogoutProps{
    router: AppRouterInstance
    onLogout: () => void
}

export const logout = async ({router, onLogout}: LogoutProps) => {
    try {
        deleteCookie('authorization', {})
        onLogout()
        router.push('/login')
    } catch (error) {
        console.log(error)
    }
}
