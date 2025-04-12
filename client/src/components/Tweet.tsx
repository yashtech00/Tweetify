import { Bookmark, Heart, MessageCircle, Repeat, User } from "lucide-react";


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
                <div className="ml-4">
                    <div className="">
                        {tweet.content}
                    </div>
                    <div className="flex justify-around">
                        <div> <MessageCircle />{tweet.comments.length}</div>
                        <div><Repeat /></div>
                        <div><Heart />{tweet.likes.length}</div>
                        <div><Bookmark /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}