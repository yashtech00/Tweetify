import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks"
import { User } from "lucide-react"
import { Tweet } from "./Tweet"

export interface TweetProp {
  
  _id: string
  content: string
  likes: []
  comments: string[],
  user: {
    username:string
  }

}

export const Tweets = ({ tweetType, username, userId }: { tweetType: string; username?: string; userId?: string }) => {
  const [allTweets, setAllTweets] = useState<TweetProp[]>([])
  const { authUser, isLoading } = useAuth()

  const tweetEndPoint = () => {
    switch (tweetType) {
      case "forYou": return '/tweets/Tweets';
      case "following": return '/tweets/following';
      case "posts": return `/tweets/user/${username}`;
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
        
        setAllTweets(res.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTweets();
  }, [tweetType, username, userId]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div>
      {allTweets.map((tweet) => (
        <div key={tweet._id} >
          <Tweet tweet={tweet}/>
        </div>
      ))}
    </div>
  )
}
