import axios from "axios";
import { Bell, Bookmark, Home, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const SideBar = () => {
  const { authUser } = useAuth(); // ← access auth from context
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const queryClient = useQueryClient();
  
  const { mutate: LogoutMutation } = useMutation({
    mutationKey: ["Logout"],
    mutationFn: async () => {
      try {
        await axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });

      } catch (e) {
        console.error(e);
        toast.error("Error while Logging out")
      }
    },
    onSuccess: () => {
      toast.success("Logout successfully")
      queryClient.invalidateQueries({queryKey:['authUser']})
    }
  })

  const handleLogout = async () => {
    LogoutMutation()
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
              to={`/bookmark`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <Bookmark className="w-6 h-6" />
              <span className="text-lg hidden md:block">Bookmark</span>
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

        <User className="w-10 h-10 rounded-full bg-white text-black p-2" />


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
