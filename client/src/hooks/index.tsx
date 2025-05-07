import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { UserProp } from "../types/type";




export const useAuth = () => {
 
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { data: authUser, isLoading } = useQuery<UserProp>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/user/auth`, { withCredentials: true });
        return res.data.data;
      } catch (e:any) {
        console.error(e.message);
        return null;
      }
    },
    retry: false
  })
  

  return (
    {authUser,isLoading}
  );
};

