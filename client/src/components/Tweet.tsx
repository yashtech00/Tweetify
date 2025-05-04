import axios from "axios";
import { Bookmark, Heart, MessageCircle, Repeat, Trash, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks";
import toast from "react-hot-toast";

interface Comment {
    _id: string;
    content: string;
    user: {
        fullname: string;
        username: string;
        profile_Image: string;
    };
}
export interface tweetProp {
    _id: string;
    content: string;
    image: string;
    user: {
        _id: string;
        username: string;
        fullname: string;
        profile_Image: string;
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
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const handleComments = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `${BACKEND_URL}/tweets/comment/${tweet._id}`, { content: inputComment },
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
                `${BACKEND_URL}/tweets/like/${tweet._id}`,
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
            await axios.delete(`${BACKEND_URL}/tweets/DeleteTweet/${tweet._id}`, {
                withCredentials: true
            });

            onDelete(tweet._id);
            toast.success("Post deleted")
        } catch (e) {
            console.error(e);
            toast.error("Error deleting Post")
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
                    <User className="w-8 h-8 rounded-full bg-white text-black p-1" />
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
                        <div className=" hover:text-red-400 text-stone-500 cursor-pointer" onClick={handleDelete}>
                            <Trash />
                        </div>
                    }

                </div>
                <div className="ml-12 ">
                <div className="py-4 ">{tweet.content}</div>
                

                    <div className="flex justify-between py-4 text-stone-500">
                        <div className="flex cursor-pointer  hover:text-blue-600" onClick={toggleModel}>
                            <MessageCircle />
                            <span className="ml-2">{comments.length}</span>
                        </div>
                        <div className="hover:text-green-500">
                            <Repeat />
                        </div>
                        <div
                            className={`flex cursor-pointer ${authUser?._id && like.includes(authUser._id) ? 'text-pink-600' : 'hover:text-pink-600'}`}
                            onClick={handleLike}
                        >
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className=" bg-black text-white p-6 rounded-xl shadow-lg w-full max-w-xl">
                <div className="flex justify-between">
                    <div className="text-lg font-bold mb-4">
                        Comments
                    </div>
                    <div>
                        <button
                            onClick={onClose}
                            className="  px-4 py-2 rounded mr-2"
                            title="Close"
                            aria-label="Close"
                        >
                            <X />
                        </button>
                    </div>
                </div>
                <div className="max-h-64 overflow-y-auto border-2 border-stone-900 rounded  p-2 mb-4">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="mb-4">
                                <div className="flex items-center">
                                    <div className="bg-gray-300 rounded-full flex justify-center items-center w-8 h-8 ">
                                        {comment.user.profile_Image ? <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-black">
                                            {comment.user.profile_Image}
                                        </div> : <User className="text-black" />}
                                    </div>
                                    <span className="font-bold ml-2">{comment.user.username}</span>
                                </div>
                                <div className="ml-10 border-l-2 border-stone-900">~{comment.content}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-stone-500">No comments yet</div>
                    )}
                </div>
                <div className=" space-x-4 ">
                    <textarea
                        className="w-full border-2 border-stone-900 rounded p-2  mt-4 bg-black"
                        placeholder="Post your comment..."
                        value={inputComment}
                        onChange={(e) => setInputComments(e.target.value)}
                    />
                    <div className="flex justify-end">

                        <button
                            onClick={onCommentSubmit}
                            className="bg-violet-500 text-white font-semibold text-xl p-2 my-0 rounded-2xl hover:bg-violet-600 mt-4 px-4 "
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}