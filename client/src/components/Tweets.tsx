import axios from "axios"
import { Tweet } from "./Tweet";
import { Loading } from "./Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tweetProp } from "../types/type";
import { useEffect } from "react";

export const Tweets = ({ tweetType, username, userId }: { tweetType: string; username?: string; userId?: string }) => {

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
  const { data: allTweets, isLoading, refetch } = useQuery<tweetProp[]>({
    queryKey: ['tweets'],
    queryFn: async () => {
      try {
        const endpoint = tweetEndPoint();
        const res = await axios.get(`${BACKEND_URL}${endpoint}`, {
          withCredentials: true,
        });
        console.log(res.data.data,"tweets");
        return res.data.data
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw e
        } else {
          throw new Error("server error")
        }
        return []
      }

    }

  });

  useEffect(() => {
    refetch()
  },[tweetType,username, refetch])

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center h-full items-center">
          <Loading />
        </div>
      ) : (
        <>
          {allTweets?.length === 0 && (tweetType === "tweets" || tweetType === "likes") ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-6">
              <p className="text-lg font-semibold">No tweets to display</p>
              <p className="text-sm">Start tweeting to see your posts here!</p>
            </div>
          ) : (
                allTweets ?.slice()
                .sort((a:any,b:any)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() )
                .map((tweet:any) => (
              <div key={tweet._id}>
                <Tweet tweet={tweet} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}


