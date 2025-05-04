import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Tweet, tweetProp } from "./Tweet"
import axios from "axios"

export const CurrentTweet = () => { 
    const [tweet, setTweet] = useState<tweetProp | null>(null)
    const { id } = useParams();

    const Backend_Url = import.meta.env.VITE_BACKEND_URL
    useEffect(() => {
        const fetchTweet = async () => {
            try {
                console.log(id, "id");
                
                const res = await axios.get(`${Backend_Url}/tweets/tweet/${id}`, {
                    withCredentials: true,
                });
                setTweet(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchTweet();
    }, [id])

    
    return (
        <div>
            <div className="flex flex-col gap-4 mt-4">
                {tweet ? (
                    <Tweet tweet={tweet} onDelete={() => { }} />
                ) : (
                    <div className="flex justify-center items-center h-full text-gray-500 mt-6">
                        <p className="text-lg font-semibold">No tweets to display</p>
                        <p className="text-sm">Start tweeting to see your posts here!</p>
                    </div>
                )}
            </div>
        </div>
    )
}