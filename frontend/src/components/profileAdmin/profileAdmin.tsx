import { User } from "@/app/register/type"

interface ProfileAdminProps {
    user: User
}

export default function ProfileAdmin({ user }: ProfileAdminProps) {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user.name}</h1>
            <div className="mb-4">
                <p className="text-gray-600">Role: {user.role}</p>
            </div>
            <div>
                <h2 className="text-lg font-bold mb-2 text-gray-800">Contact Information</h2>
                <p className="text-gray-600">Phone: {user.tel}</p>
                <p className="text-gray-600">Email: {user.email}</p>
            </div>
        </div>
    );
}