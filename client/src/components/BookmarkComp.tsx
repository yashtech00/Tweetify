import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { tweetProp } from "../types/type";

export const BookmarkComp = () => {

    // const [bookmark, setBookmark] = useState([]);
    const Backend_Url = import.meta.env.BACKEND_URL;

    const { data: bookmark } = useQuery<tweetProp[]>({
        queryKey: ['bookmark'],
        queryFn: async () => {
            try {
                const res = await axios.get(`${Backend_Url}/tweets/bookmark`, { withCredentials: true });

                return res.data.data

            } catch (e: any) {
                console.error(e.message);
                toast.error("Error while fetching bookmarks")
                return null
            }
        }
    })

    return (
        <div>
            <div>
                <p>Bookmark</p>
            </div>
            <div>
                {bookmark?.map((bm: tweetProp) => (
                    <div key={bm._id}>
                        <div className="border-b-2 border-stone-800 p-4">
                            <div className="flex justify-between">
                                <div className="flex ">
                                    <User className="w-8 h-8 rounded-full bg-white text-black p-1" />
                                    <div className="mx-4">
                                        <div className=" ">{bm.user.username}</div>
                                        <div className="text-stone-500">{new Date(bm.createdAt).toLocaleString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-12 ">
                                <div className="py-4 ">{bm.content}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}