import axios from "axios";
import { Home, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {

    const navigate = useNavigate();
    const handleLogout = async() => {
        try {
            const res = await axios.post("http://localhost:8001/user/logout")
            console.log(res);
            navigate("/login")
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="sticky top-0 w-64 h-screen p-6 border-r bg-white flex flex-col justify-between">
  <div>
    <h1 className="text-3xl font-bold text-blue-500 mb-8">Tweetify</h1>
    <ul className="space-y-4">
      <li className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-blue-500 cursor-pointer transition">
        <Home />
        <span>Home</span>
      </li>
      <li className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-blue-500 cursor-pointer transition">
        <User />
        <span>Profile</span>
      </li>
    </ul>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    <div className="flex-1">
      <p className="font-semibold text-sm text-gray-800 truncate">Full Name</p>
      <p className="text-sm text-gray-500">@username</p>
    </div>
    <LogOut className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer" onClick={handleLogout} />
  </div>
</div>

    );
};
