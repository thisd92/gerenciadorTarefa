import { deleteCookie } from "cookies-next"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

interface LogoutProps{
    router: AppRouterInstance
    onLogout: () => void
    toggleDropdown: () => void
}

export const logout = async ({router, onLogout, toggleDropdown}: LogoutProps) => {
    try {
        deleteCookie('authorization', {})
        onLogout()
        router.push('/login')
        toggleDropdown();
    } catch (error) {
        console.log(error)
    }
}
