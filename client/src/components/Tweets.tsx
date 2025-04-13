import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks"
import { Tweet, tweetProp } from "./Tweet";
import { useParams } from "react-router-dom";





export const Tweets = ({ tweetType, username, userId }: { tweetType: string; username?: string; userId?: string }) => {
  const [allTweets, setAllTweets] = useState<tweetProp[]>([])
  const { isLoading } = useAuth()
  

  const tweetEndPoint = () => {
    switch (tweetType) {
      case "forYou": return '/tweets/Tweets';
      case "following": return '/tweets/following';
      case "tweets": return `/tweets/user/${username}`;
      case "likes": return `/tweets/like/${userId}`;
      default: return '/tweets/Tweets';
    }
  }

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const endpoint = tweetEndPoint();
        const res = await axios.get(`http://localhost:8001${endpoint}`, {
          withCredentials: true,
        });
        
        console.log(res,"tweets");
        
        setAllTweets([...res.data.data].reverse());
      } catch (e) {
        console.error(e);
      }
    };

    fetchTweets();
  }, [tweetType, username, userId]);

  const handleDeleteTweet = (tweetId: string) => {
    setAllTweets((prev) => prev.filter((tweet) => tweet._id !== tweetId));
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div>
      {allTweets.map((tweet) => (
        <div key={tweet._id} >
          <Tweet tweet={tweet} onDelete={handleDeleteTweet}/>
        </div>
      ))}
    </div>
  )
}
