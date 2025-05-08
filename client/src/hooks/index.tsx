import axios, { isAxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProp } from "../types/type";
import { useState } from "react";
import toast from "react-hot-toast";


export const useAuth = () => {
 

  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { data: authUser, isLoading } = useQuery<UserProp>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth/me`, { withCredentials: true });
        return res.data.data;
      } catch (e:any) {
        console.error(e.message);
        return null;
      }
    },
    retry: false
  })

  const queryClient = useQueryClient();
  const { mutate:followUnfollowMutation,isPending} = useMutation({
    mutationKey: ['followUnfollow'],
    mutationFn: async (userId: string) => {
      try {
        const res = await axios.post(`${BACKEND_URL}/profile/follow/${userId}`,{},{withCredentials:true});
        return res.data
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw e
        } else {
          throw new Error("server error")
        }
      }
    },
    onSuccess: () => {
      toast.success("Follow/Unfollow successfully")
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['authUser'] }),
        queryClient.invalidateQueries({ queryKey: ['suggestedUser'] })
      ])
     
    },
    onError:()=> {
      toast.error("Error while Follow/Unfollow")
    }
  })

  return (
    {authUser,isLoading, followUnfollowMutation,isPending}
  );
};

