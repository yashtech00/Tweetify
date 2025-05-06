import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks"
import { Tweet, tweetProp } from "./Tweet";
import { Loading } from "./Loading";

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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true);
      try {
        const endpoint = tweetEndPoint();
        const res = await axios.get(`${BACKEND_URL}${endpoint}`, {
          withCredentials: true,
        });

        console.log(res, "tweets");

        setAllTweets([...res.data.data].reverse());
      } catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [tweetType, username, userId]);

  const handleDeleteTweet = (tweetId: string) => {
    setAllTweets((prev) => prev.filter((tweet) => tweet._id !== tweetId));
  };

  

  return (
    <div>
      {loading ? (
        <div className="flex justify-center h-full items-center">
          <Loading />
        </div>
      ) : (
        <>
          {allTweets.length === 0 && (tweetType === "tweets" || tweetType === "likes") ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-6">
              <p className="text-lg font-semibold">No tweets to display</p>
              <p className="text-sm">Start tweeting to see your posts here!</p>
            </div>
          ) : (
            allTweets.map((tweet) => (
              <div key={tweet._id}>
                <Tweet tweet={tweet} onDelete={handleDeleteTweet} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}


