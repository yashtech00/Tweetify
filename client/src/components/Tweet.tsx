import { Heart, MessageCircle, User } from "lucide-react"
import { TweetProp } from "./Tweets"
import axios from "axios"
import { useAuth } from "../hooks"
import { useState } from "react"

export const Tweet = ({ tweet}: { tweet: TweetProp}) => {

    const { authUser } = useAuth();
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const handleLike = async() => {
        try {
            const res = await axios.put(`http://localhost:8001/tweets/like/${tweet._id}`, { withCredentials: true });
            console.log(res.data,"likes");
            setLikes(res.data)
        } catch (e) {
            console.error(e);
            
        }
    }
    
    const handleComment = async() => {
        try {
            const res = await axios.put(`http://localhost:8001/tweets/comment/${tweet._id}`, { withCredentials: true });
            console.log(res.data,"likes");
            setLikes(res.data)
        } catch (e) {
            console.error(e);
            
        }
    }
    const handleDelete = async() => {
        try {
            const res = await axios.put(`http://localhost:8001/tweets/DeleteTweet/${tweet._id}`, { withCredentials: true });
            console.log(res.data,"likes");
            setLikes(res.data)
        } catch (e) {
            console.error(e);
            
        }
    }




    return (
        <div className="border-b border-gray-200 p-4">
            <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-gray-700">@{tweet.user.username}</p>
              <p className="text-gray-800 mt-1">{tweet.content}</p>
              <div className="flex space-x-6 mt-2 text-sm text-gray-500">
                        <div className="flex " >
                            <Heart onClick={handleLike} className="w-6 h-6 mr-2 " /> {tweet.likes.length}
                        </div>
                        <div className="flex">
                            <button onClick={handleComment} className="" title="Comment">
                                <MessageCircle  className="w-6 h-6 mx-2" />
                                </button>
                                {tweet.comments.length}
                        </div>
              </div>
            </div>
          </div>
        </div>
    )
}