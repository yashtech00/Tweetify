import { useState } from "react"
import { Tweets } from "./Tweets";
import { CreateTweet } from "./CreateTweet";


export const HomeComp = () => {

    const [tweetType, setTweetType] = useState<string>("ForYou");

    return (
        <div className="flex-[4_4_0] mr-auto border-r border-gray-300 min-h-screen">
            
            <div className="w-full flex border-b border-gray-300">
             
                <div className="flex justify-center flex-1 p-3 cursor-pointer relative hover:bg-secondary transition duration-300 " onClick={()=>setTweetType("ForYou")}>
                    For you
                </div>
                <div className="flex justify-center flex-1 p-3 cursor-pointer relative hover:bg-secondary transition duration-300" onClick={()=>setTweetType("Following")}>
                    Following
                    </div>
                 
            </div>

            <CreateTweet/>

            <Tweets tweetType={tweetType} />
       </div>
    )
}