import { Link } from "react-router-dom";
import axios from "axios";

import { User } from "lucide-react";
import { UserProp } from "../types/type";
import { useAuth } from "../hooks";
import { useQuery } from "@tanstack/react-query";

function RightPanel() {
    const { followUnfollowMutation} = useAuth();
    const Backend_Url = import.meta.env.VITE_BACKEND_URL;
    const { data: suggestedUser, isLoading } = useQuery<UserProp[]>({
        queryKey: ['suggested'],
        queryFn: async () => {
            try {
                const res = await axios.get(`${Backend_Url}/profile/suggested`, { withCredentials: true });

                return res.data
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    throw e
                } else {
                    throw new Error("server error")
                }
            }
        }
    })

    if (suggestedUser?.length === 0 && !isLoading) return <div className="md:w-64 w-0"></div>;

    return (
        <div className='hidden lg:block my-4 mx-2 text-white'>
            <div className='border-2 border-stone-900 p-4 rounded-md sticky top-2'>
                <p className='font-bold'>Who to follow</p>
                <div className='flex flex-col gap-4 m-2'>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-8 ">
                            <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-10 animate-spin"></div>
                        </div>
                    ) : (
                        suggestedUser?.map((user) => (
                            <div key={user._id} className="flex justify-between items-center">
                                <div className='flex gap-2 items-center'>
                                    <div className='avatar'>
                                        <div className='w-8 rounded-full'>

                                            <User className="w-9 h-9 rounded-full bg-white text-black p-2" />

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
                                        className='btn bg-violet-500 text-white hover:opacity-90 rounded-full btn-sm px-3'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            followUnfollowMutation(user._id);

                                        }}
                                    >
                                       
                                            Follow
                                        
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default RightPanel;
