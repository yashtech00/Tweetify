import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import useFollow from "../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";



export interface User {
  _id: string;
  fullname: string;
  username: string;
  profileImg: string;
}


function RightPanel() {
    const [suggestedUser, setSuggestedUser] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  const { followAndUnfollow, isPending } = useFollow();
  
  const Backend_Url = import.meta.env.VITE_BACKEND_URL;

    const fetchSuggestedUsers = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${Backend_Url}/profile/suggested`,{withCredentials:true});
            setSuggestedUser(res.data);
        } catch (error) {
            console.error("Failed to fetch suggested users");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestedUsers();
    }, []);

    if (suggestedUser.length === 0 && !isLoading) return <div className="md:w-64 w-0"></div>;

    return (
        <div className='hidden lg:block my-4 mx-2 border-4'>
            <div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
                <p className='font-bold'>Who to follow</p>
                <div className='flex flex-col gap-4'>
                    {isLoading ? (
                        <>Loading...</>
                    ) : (
                        suggestedUser.map((user) => (
                            <Link
                                to={`/profile/${user.username}`}
                                className='flex items-center justify-between gap-4'
                                key={user._id}
                            >
                                <div className='flex gap-2 items-center'>
                                    <div className='avatar'>
                                        <div className='w-8 rounded-full'>
                                            <img src={user.profileImg || "/avatar-placeholder.png"} alt={`${user.fullname}'s profile`} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold tracking-tight truncate w-28'>
                                            {user.fullname}
                                        </span>
                                        <span className='text-sm text-slate-500'>@{user.username}</span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await followAndUnfollow(user._id);
                                            fetchSuggestedUsers(); // refetch after follow
                                        }}
                                    >
                                        {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                                    </button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default RightPanel;
