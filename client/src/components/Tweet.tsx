import axios from "axios";
import { Bookmark, Heart, MessageCircle, Repeat, Trash, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks";

interface Comment {
    _id: string;
    content: string;
    user: {
        fullname: string;
        username: string;
    };
}
export interface tweetProp {
    _id: string;
    content: string;
    user: {
        _id: string;
        username: string;
        fullname: string;
    };
    comments: Comment[];
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const Tweet = ({ tweet, onDelete }: {
    tweet: tweetProp;
    onDelete: (tweetId: string) => void;
}) => {
    const { authUser } = useAuth();
    const isMyPost = authUser?._id === tweet.user._id;
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [like, setLike] = useState(tweet.likes);
    const [comments, setComments] = useState<Comment[]>(Array.isArray(tweet.comments) ? tweet.comments : []);

    const [inputComment, setInputComments] = useState("");

    const handleComments = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:8001/tweets/comment/${tweet._id}`, { content: inputComment },
                {
                    withCredentials: true,
                }
            );
            console.log(res, "comment handle");
            setComments([...res.data.data].reverse());
            setInputComments("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleLike = async () => {
        try {
            const res = await axios.put(
                `http://localhost:8001/tweets/like/${tweet._id}`,
                {},
                {
                    withCredentials: true,
                }
            );
            console.log(res, "tweet like");
            setLike(res.data)
        } catch (e: any) {
            console.error(e.message);

        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8001/tweets/DeleteTweet/${tweet._id}`, {
                withCredentials: true
            });

            onDelete(tweet._id);
        } catch (e) {
            console.error(e);
        }
    };


    const toggleModel = () => {
        setIsModelOpen(!isModelOpen);
    };

    return (
        <div className="bg-black text-white">
            <div className="border-b-2 border-stone-800 p-4">
                <div className="flex justify-between">
                    <div className="flex ">
                        <div className="rounded-full w-8 h-8 bg-gray-300 flex justify-center items-center text-black">
                            <User />
                        </div>
                        <div className="mx-4">
                            <div className=" ">{tweet.user.username}</div>

                            <div className="text-stone-500">{new Date(tweet.createdAt).toLocaleString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}</div>
                        </div>
                    </div>
                    {isMyPost &&
                        <div className=" hover:text-red-400 text-stone-500" onClick={handleDelete}>
                            <Trash />
                        </div>
                    }

                </div>
                <div className="ml-12 ">
                    <div className="py-4 ">{tweet.content}</div>

                    <div className="flex justify-between py-4 text-stone-500">
                        <div className="flex cursor-pointer hover:text-blue-600 " onClick={toggleModel}>
                            <MessageCircle />
                            <span className="ml-2">{comments.length}</span>
                        </div>
                        <div className="hover:text-green-500">
                            <Repeat />
                        </div>
                        <div className="flex cursor-pointer hover:text-pink-600" onClick={handleLike} >
                            <Heart />
                            <span className="ml-2">{like.length}</span>
                        </div>
                        <div className="hover:text-blue-500">
                            <Bookmark />
                        </div>
                    </div>
                </div>
            </div>

            {isModelOpen && (
                <CommentModel
                    onClose={toggleModel}
                    comments={comments}
                    onCommentSubmit={handleComments}
                    inputComment={inputComment}
                    setInputComments={setInputComments}
                />
            )}
        </div>
    );
};

interface CommentModelProps {
    onClose: () => void;
    comments: Comment[];
    onCommentSubmit: (e: React.FormEvent) => void;
    inputComment: string;
    setInputComments: (value: string) => void;
}

function CommentModel({
    onClose,
    comments,
    onCommentSubmit,
    inputComment,
    setInputComments,
}: CommentModelProps) {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
            <div className=" bg-black text-white p-6 rounded shadow-lg w-96">
                <div className="text-lg font-bold mb-4">Comments</div>
                <div className="max-h-64 overflow-y-auto">
                    {comments.map((comment) => (
                        <div key={comment._id} className="mb-4">
                            <div className="flex items-center">
                                <div className="bg-gray-300 rounded-full flex justify-center items-center w-8 h-8 ">
                                    <User className=" " />
                                </div>
                                <span className="font-bold ml-2">{comment.user.username}</span>
                            </div>
                            <div className="ml-10">{comment.content}</div>
                        </div>
                    ))}
                </div>
                <textarea
                    className="w-full border rounded p-2 mt-4 bg-black"
                    placeholder="Add a comment..."
                    value={inputComment}
                    onChange={(e) => setInputComments(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                    >
                        Close
                    </button>
                    <button
                        onClick={onCommentSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}