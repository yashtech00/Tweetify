import { useState } from "react";
import { Tweets } from "./Tweets";
import { CreateTweet } from "./CreateTweet";

export const HomeComp = () => {
  const [tweetType, setTweetType] = useState<string>("ForYou");

  return (
    <>
      <div className="border-b border-stone-800 bg-black sticky ">
        <div className="flex flex-col sm:flex-row">
          <div
            onClick={() => setTweetType("ForYou")}
            className={`flex-1 text-center py-3 cursor-pointer font-semibold ${
              tweetType === "ForYou"
                ? "border-b-4 border-violet-500 text-violet-600"
                : "text-white"
            }`}
          >
            For You
          </div>
          <div
            onClick={() => setTweetType("Following")}
            className={`flex-1 text-center py-3 cursor-pointer font-semibold ${
              tweetType === "Following"
                ? "border-b-4 border-violet-500 text-violet-600"
                : "text-white"
            }`}
          >
            Following
          </div>
        </div>
      </div>

     
        <CreateTweet />
        <Tweets tweetType={tweetType} />
      
    </>
  );
};