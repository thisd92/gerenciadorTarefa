import { logout } from "@/services/logout";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

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

    return (
        <div>
            <div className="relative">
                <button
                    type="button"
                    className="mr-4 hover:bg-gray-400 rounded-md p-1"
                    onClick={toggleDropdown}
                >
                    <button className="flex items-center">
                        <FaUserCircle size={20} />
                    </button>
                </button>

                <div
                    className={`absolute right-0 z-10 w-56 mt-2 origin-top-right bg-gray-400 rounded-md shadow-lg ${isOpen ? "" : "hidden"
                        }`}
                    ref={dropdownRef}
                >
                    <div className="p-2">
                        <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-700"
                        >
                            Profile
                        </Link>
                        <button
                            className="block text-left w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-700"
                            onClick={() => logout({ router, onLogout })}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
