import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { AiFillHome } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";

import ProfileButton from "../profileButton/profileButton";
import { RiDashboardFill } from "react-icons/ri";


interface HeaderProps {
    isLogged: boolean;
    router: AppRouterInstance;
    onLogout: () => void
}

export function Header({ isLogged, router, onLogout }: HeaderProps) {

    return (
        <header className="w-full">
            <nav>
                <ul className='flex items-center justify-end flex-wrap bg-gray-500 p-6'>
                    <li className='mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1'>
                        <Link className='flex items-center' href="/"><AiFillHome className='mr-1' />Home</Link>
                    </li>
                    <li className='mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1'>
                        <Link className='flex items-center' href="/dashboard"><RiDashboardFill className='mr-1' />Dashboard</Link>
                    </li>
                    <li className='mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1'>
                        <Link className='flex items-center' href="/taskManager"><GoTasklist className='mr-1' />Task Manager</Link>
                    </li>
                    <li className='mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1'>
                        {!isLogged && <Link className='flex items-center' href="/login">
                            <IoLogInOutline className='mr-1' />Login
                        </Link>}
                        {isLogged && <ProfileButton onLogout={onLogout} router={router} />}
                    </li>
                </ul>
            </nav>
        </header>
    )
}