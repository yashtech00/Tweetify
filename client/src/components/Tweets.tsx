import axios from "axios"
import { useEffect, useState } from "react"

interface tweetProp {
    id: string,
    content: string,
    likes: string,
    comments:string
}



export const Tweets = ({ tweetType }: { tweetType: string }) => {

    const [allTweets, setAllTweets] = useState<tweetProp[]>([]);
    const PORT = import.meta.env.REACT_APP_PORT_NO;
    if (tweetType === "ForYou") {
        useEffect(() => {
            const fetchTweet = async () => {
                try {
                    const res = await axios.get(`http://localhost:${PORT}/tweets/Tweets`)
                    console.log(res);
                    
                    setAllTweets(Array.isArray(res.data) ? res.data : []);
                } catch (e) {
                    console.error(e);
                }
            }
            fetchTweet();
        },[])
    }


    return (
        <div className="">
            {allTweets.map((tweet) => (
                <div key={tweet.id}>
                    {tweet.content}
                    {tweet.likes.length}
                    {tweet.comments.length}
                </div>
            ))}
        </div>
    )
}