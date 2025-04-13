import axios from "axios";
import { Bookmark, Heart, MessageCircle, Repeat, User } from "lucide-react";
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
        username: string;
        fullname: string;
    };
    comments: Comment[];
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const Tweet = ({ tweet }: { tweet: tweetProp }) => {
    const { authUser } = useAuth();
    console.log(tweet);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [like, setLike] = useState(tweet.likes);
    const [comments, setComments] = useState(tweet.comments);
    const [inputComment, setInputComments] = useState("");

    const handleComments = async () => {
        try {
            const res = await axios.put(
                `http://localhost:3000/tweets/comment/${tweet._id}`,
                {},
                {
                    withCredentials: true,
                }
            );
            console.log(res);
            setComments(res.data);
            setInputComments("");
        } catch (e) {
            console.error(e);
        }
    };

    const toggleModel = () => {
        setIsModelOpen(!isModelOpen);
    };

    return (
        <div>
            <div className="border-2 p-4">
                <div className="flex ">
                    <div className="rounded-full w-8 h-8 bg-gray-300 flex justify-center items-center">
                        <User />
                    </div>
                    <div className="mx-4">{tweet.user.username}</div>
                </div>
                <div className="ml-12">
                    <div className="py-4">{tweet.content}</div>

                    <div className="flex justify-between py-4">
                        <div className="flex">
                            <MessageCircle className="cursor-pointer" onClick={toggleModel} />
                            <span className="ml-2">{comments.length}</span>
                        </div>
                        <div>
                            <Repeat />
                        </div>
                        <div className="flex">
                            <Heart />
                            <span className="ml-2">{like.length}</span>
                        </div>
                        <div>
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
    onCommentSubmit: () => void;
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <div className="text-lg font-bold mb-4">Comments</div>
                <div className="max-h-64 overflow-y-auto">
                    {comments.map((comment) => (
                        <div key={comment._id} className="mb-4">
                            <div className="flex items-center">
                                <User className="mr-2" />
                                <span className="font-bold">{comment.user.username}</span>
                            </div>
                            <div className="ml-6">{comment.content}</div>
                        </div>
                    ))}
                </div>
                <textarea
                    className="w-full border rounded p-2 mt-4"
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