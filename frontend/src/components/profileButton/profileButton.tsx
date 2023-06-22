import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { FaUserCircle } from "react-icons/fa";

import { logout } from "@/services/logout";
import { getToken } from "@/services/auth";
import { BASE_URL } from "@/utils/request";

interface ProfileButtonProps {
    router: AppRouterInstance,
    onLogout: () => void
}

export default function ProfileButton({ router, onLogout }: ProfileButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToProfile = async () => {
        try {

            const response = await axios.get(`${BASE_URL}/api/profile`, {
                headers: {
                    Authorization: `${getToken()}`
                }
            })
            const userId = response.data
            setIsOpen(false)
            router.push(`/profile/${userId}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="relative">
                <button
                    type="button"
                    className="rounded-md p-1"
                    onClick={toggleDropdown}
                >
                    <FaUserCircle size={20} />
                </button>
                <div
                    className={`absolute right-0 z-10 w-56 mt-2 origin-top-right bg-gray-400 rounded-md shadow-lg ${isOpen ? "" : "hidden"
                        }`}
                    ref={dropdownRef}
                >
                    <div className="p-2">
                        <button
                            onClick={handleToProfile}
                            className="block text-left w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-700"
                        >
                            Profile
                        </button>
                        <button
                            className="block text-left w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-700"
                            onClick={() => logout({ router, onLogout, toggleDropdown })}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
