import axios from "axios";
import { Bell, Home, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import toast from "react-hot-toast";


export const SideBar = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth(); // ← access auth from context
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/user/logout`, {}, { withCredentials: true });
      setAuthUser(null)
      navigate("/login");
      toast.success("Logout successfully,Please visit again ")
    } catch (e) {
      console.error("Logout failed:", e);
      toast.error("Error while Logout")
    }
  };

  return (
    <div className="sticky top-0 w-64 h-screen p-6  text-white flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-violet-500 mb-8">Tweetify</h1>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <Home className="w-6 h-6" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <Bell className="w-6 h-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <User className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-black"><User/></div>
        <div className="flex-1">
          <p className="font-semibold text-sm  truncate">{authUser?.fullname}</p>
          <p className="text-sm text-gray-400">@{authUser?.username}</p> {/* Fix this */}
        </div>
        <LogOut
          className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};
