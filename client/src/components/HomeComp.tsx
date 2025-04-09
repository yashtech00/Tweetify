import { useState } from "react"
import { Tweets } from "./Tweets";
import { CreateTweet } from "./CreateTweet";


export const HomeComp = () => {

    const [tweetType, setTweetType] = useState<string>("ForYou");

    return (
        <>
        <div className="border-b border-gray-300 bg-white sticky top-0 z-10">
  <div className="flex">
    <div onClick={() => setTweetType("ForYou")} className={`flex-1 text-center py-3 cursor-pointer font-semibold ${tweetType === "ForYou" ? "border-b-4 border-blue-500 text-blue-600" : "hover:bg-gray-100"}`}>
      For You
    </div>
    <div onClick={() => setTweetType("Following")} className={`flex-1 text-center py-3 cursor-pointer font-semibold ${tweetType === "Following" ? "border-b-4 border-blue-500 text-blue-600" : "hover:bg-gray-100"}`}>
      Following
    </div>
  </div>
</div>

<CreateTweet />
<Tweets tweetType={tweetType} />
</>
    )
}