import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks"
import { User } from "lucide-react"

interface TweetProp {
  id: string
  content: string
  likes: string[]
  comments: string[],
  user: {
    username:string
  }
}

export const Tweets = ({ tweetType, username, userId }: { tweetType: string; username: string; userId: string }) => {
  const [allTweets, setAllTweets] = useState<TweetProp[]>([])
  const { authUser, isLoading } = useAuth()

  const tweetEndPoint = () => {
    switch (tweetType) {
      case "forYou": return '/tweet/Tweets';
      case "following": return '/tweet/following';
      case "posts": return `/tweet/user/${username}`;
      case "likes": return `/tweet/like/${userId}`;
      default: return '/tweet/Tweets';
    }
  }

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const endpoint = tweetEndPoint();
        const res = await axios.get(`http://localhost:8001${endpoint}`, {
          withCredentials: true,
        });
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
        <div key={tweet.id} className="border-b border-gray-200 p-4">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-gray-700">@{tweet.user.username}</p>
              <p className="text-gray-800 mt-1">{tweet.content}</p>
              <div className="flex space-x-6 mt-2 text-sm text-gray-500">
                <div>❤️ {tweet.likes.length}</div>
                <div>💬 {tweet.comments.length}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
