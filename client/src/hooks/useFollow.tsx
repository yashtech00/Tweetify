import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useFollow() {
    const [isPending, setIsPending] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const Backend_Url = import.meta.env.VITE_BACKEND_URL;

    const followAndUnfollow = async (userId: string) => {
        setIsPending(true);
        try {
            const res = await axios.post(`${Backend_Url}/profile/follow/${userId}`,{},{withCredentials:true});
            toast.success("Follow/unfollow successful");

            // After follow/unfollow, refetch the updated data manually
            fetchAuthUser();
            fetchSuggestedUsers();

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to follow");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsPending(false);
        }
    };

    // manually fetch auth user data
    const fetchAuthUser = async () => {
        try {
            const res = await axios.get("/api/users/me");
            setAuthUser(res.data);
        } catch (error) {
            console.error("Failed to fetch auth user");
        }
    };

    // manually fetch suggested users
    const fetchSuggestedUsers = async () => {
        try {
            const res = await axios.get("/api/users/suggested");
            setSuggestedUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch suggested users");
        }
    };

    return { followAndUnfollow, isPending, authUser, suggestedUsers };
}

export default useFollow;
