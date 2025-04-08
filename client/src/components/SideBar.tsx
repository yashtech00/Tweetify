import { Home, User } from "lucide-react";

export const SideBar = () => {
    return (
        <div className="sticky w-[25%] p-6 border-r h-screen bg-gray-50 ">
            <div className="flex justify-end">
                <div className="flex flex-col items-start ">
                <span className="text-3xl font-extrabold text-blue-600 mb-6">Tweetify</span>
                <ul className="space-y-4 w-full">
                    <li className="p-4 font-semibold flex items-center rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition">
                        <Home className="mr-3" />
                        Home
                    </li>
                    <li className="p-4 font-semibold flex items-center rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition">
                        <User className="mr-3" />
                        Profile
                    </li>
                    </ul>
                    </div>
            </div>
        </div>
    );
};
