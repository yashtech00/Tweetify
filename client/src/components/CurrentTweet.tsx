import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tweet } from "./Tweet";
import axios from "axios";
import { useAuth } from "../hooks";
import { Loading } from "./Loading";
import { tweetProp } from "../types/type";

export const CurrentTweet = () => { 
    const [tweet, setTweet] = useState<tweetProp | null>(null);
    const [isTweetLoading, setIsTweetLoading] = useState(true);
    const { id } = useParams();
    const { isLoading } = useAuth();

    const Backend_Url = import.meta.env.VITE_BACKEND_URL;

    

    useEffect(() => {
        const fetchTweet = async () => {
            try {
                setIsTweetLoading(true);
                const res = await axios.get(`${Backend_Url}/tweets/tweet/${id}`, {
                    withCredentials: true,
                });
                setTweet(res.data.data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsTweetLoading(false);
            }
        };
        fetchTweet();
    }, [id]);

    return (
        <div>
            {isLoading || isTweetLoading ? (
                <Loading />
            ) : (
                <div className="flex flex-col gap-4 mt-4">
                    {tweet ? (
                        <Tweet tweet={tweet} />
                    ) : (
                        <div className="flex flex-col justify-center items-center h-full text-gray-500 mt-6">
                            <p className="text-lg font-semibold">No tweets to display</p>
                            <p className="text-sm">Start tweeting to see your posts here!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
