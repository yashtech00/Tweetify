import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


import LoadingSpinner from "./LoadingSpinner";
import { Heart, User } from "lucide-react";

interface From {
  _id: string;
  username: string;
  profileImg: string;
}

interface Notification {
  _id: string;
  from: From;
  type: "follow" | "like";
}

export const Notify = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/notify/notification`, {
        withCredentials: true,
      });
        console.log(res.data.data,"notify");
        
      setNotifications(res.data.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
      toast.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

 

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen text-white">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold">Notifications</p>
       
      </div>

      {isLoading && (
        <div className="flex justify-center h-full items-center">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!isLoading && notifications.length === 0 && (
        <div className="text-center p-4 font-bold">No notifications 🤔</div>
      )}

      {notifications.map((notification) => (
        <div className="border-b border-gray-700" key={notification._id}>
          <div className="flex gap-2 p-4">
            {notification.type === "follow" && (
              <User className="w-7 h-7 text-primary" />
            )}
            {notification.type === "like" && (
              <Heart className="w-7 h-7 text-red-500" />
            )}
            <Link to={`/profile/${notification.from.username}`} className="flex items-center gap-2">
              <div className="bg-gray-300 rounded-full flex justify-center items-center w-8 h-8">
               <User/>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">@{notification.from.username}</span>{" "}
                {notification.type === "follow"
                  ? "followed you"
                  : "liked your post"}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};


