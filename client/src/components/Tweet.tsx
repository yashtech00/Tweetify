import { Bookmark, Heart, MessageCircle, Repeat, User } from "lucide-react";
import { useState } from "react";


interface Comment {
    _id: string;
    content: string
    user: {
        fullname: string;
        username: string;
    }
}
export interface tweetProp {
    _id: string;
    content: string;
    user: {
        username: string;
        fullname: string;
    }
    comments: Comment[];
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const Tweet = ({ tweet }: { tweet: tweetProp }) => {
    console.log(tweet);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [like, setLike] = useState(tweet.likes);
    const [comments, setComments] = useState(tweet.comments);
    const [imputComment, setInputComments] = useState("");

    const handleComments = () => {
        
    }

    return (
        <div>
            <div className="border-2 p-4">
                <div className="flex ">
                    <div className="rounded-full w-8 h-8 bg-gray-300 flex justify-center items-center">
                        <User />
                    </div>
                    <div className="mx-4">
                        {tweet.user.username}

                    </div>
                </div>
                <div className="ml-12  ">
                    <div className=" py-4">
                        {tweet.content}
                    </div>
                    
                    <div className="flex justify-between py-4">
                        <div className="flex" onClick={CommentModel(handleComments)}>
                            <MessageCircle className="" />
                                <span className="ml-2">{tweet.comments.length}</span>
                            </div>
                        <div><Repeat /></div>
                            <div className="flex"><Heart />
                                <span className="ml-2">{tweet.likes.length}</span>
                            </div>
                        <div><Bookmark /></div>
                        </div>
                        
                </div>
            </div>
        </div>
    )
}

function CommentModel(){
    return (
        <div>
            <dialog>
                <div>Comments</div>
                <div>
                    <User />
                    <span>{Comment}</span>
                </div>
            </dialog>
        </div>
    )
}