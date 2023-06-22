import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/Context/AuthContext";
import ProfileButton from "../profileButton/profileButton";

import { AiFillHome, AiFillProject } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";


export function Header() {

    const router = useRouter()

    const { isLogged, onLogout } = useContext(AuthContext);

    const renderSignedIn = () => {
        if (isLogged) {
            return <ProfileButton onLogout={onLogout} router={router} />;
        }
        return (
            <Link className="flex items-center" href="/login">
                <IoLogInOutline className="mr-1" />
                Login
            </Link>
        );
    };

    return (
        <header className="w-full">
            <nav>
                <ul className="flex items-center justify-end flex-wrap bg-gray-500 p-6">
                    <li className="mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1">
                        <Link className="flex items-center" href="/">
                            <AiFillHome className="mr-1" />
                            Home
                        </Link>
                    </li>
                    <li className="mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1">
                        <Link className="flex items-center" href="/dashboard">
                            <RiDashboardFill className="mr-1" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1">
                        <Link className="flex items-center" href="/project">
                            <AiFillProject className="mr-1" />
                            Project Manager
                        </Link>
                    </li>
                    <li className="mr-4 font-bold text-gray-100 hover:bg-gray-700 rounded-md p-1">
                        {renderSignedIn()}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
