import Link from "next/link";

import { AiFillHome } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";
import ProfileButton from "../profileButton/profileButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";


interface HeaderProps {
    isLogged: boolean;
    router: AppRouterInstance;
    onLogout: () => void
}

export function Header({ isLogged, router, onLogout }: HeaderProps) {
    console.log('isLogged:', isLogged);

    return (
        <header className="w-full">
            <nav>
                <ul className='flex items-center justify-end flex-wrap bg-slate-300 p-6'>
                    <li className='mr-4 hover:bg-slate-400 rounded-md p-1'>
                        <Link className='flex items-center' href="/"><AiFillHome className='mr-1' />Home</Link>
                    </li>
                    <li className='mr-4 hover:bg-slate-400 rounded-md p-1'>
                        <Link className='flex items-center' href="/taskManager"><GoTasklist className='mr-1' />Task Manager</Link>
                    </li>
                    <li className='mr-4 hover:bg-slate-400 rounded-md p-1'>
                        {isLogged && <ProfileButton onLogout={onLogout} router={router} />}
                        {!isLogged && <Link className='flex items-center' href="/login">
                            <IoLogInOutline className='mr-1' />Login
                        </Link>}
                    </li>
                </ul>
            </nav>
        </header>
    )
}