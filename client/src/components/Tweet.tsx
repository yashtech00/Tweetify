import axios from "axios";
import { Bookmark, Heart, MessageCircle, Repeat, Trash, User, X } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../hooks";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment, tweetProp } from "../types/type";



export const Tweet = ({ tweet }: { tweet: tweetProp }) => {
    const { authUser } = useAuth();
    const isMyPost = authUser?._id === tweet.user._id;
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [inputComment, setInputComment] = useState("")
    const [comments, setComments] = useState("");


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const queryClient = useQueryClient();

    const { mutate: LikeMutation, isPending: isLiking } = useMutation({
        mutationKey: ['like'],
        mutationFn: async () => {
            await axios.put(`${BACKEND_URL}/tweets/like/${tweet._id}`, {}, { withCredentials: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tweets'] });
        },
        onError: () => {
            toast.error("Post like failed");
        }
    });
    
    const { mutate: CommentMutation, isPending: isCommenting } = useMutation({
        mutationKey: ['comment'],
        mutationFn: async () => {
            try {
                const res = await axios.put(
                    `${BACKEND_URL}/tweets/comment/${tweet._id}`, { content: inputComment },
                    {
                        withCredentials: true,
                    })
                return res.data.data;
            } catch (error: any) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    throw error;
                } else {
                    throw new Error('Server error');
                }
            }
        },
        onSuccess: (updated: tweetProp) => {
            // toast.success("commented successfully");
            setComments("");
            queryClient.setQueryData(["tweets"], (oldData: tweetProp[]) => {

                return oldData.map(p => {
                    if (p._id === tweet._id) {

                        return { ...p, comments: updated };

                    }
                    return p;
                });
            });
        },
        onError: () => {
            toast.error("commenting failed");
        }
    })
    const { mutate: DeleteMutation } = useMutation({
        mutationKey: ['deleteTweet'],
        mutationFn: async () => {
            try {
                const res = await axios.delete(`${BACKEND_URL}/tweets/DeleteTweet/${tweet._id}`, {
                    withCredentials: true
                });
                return res.data.data;
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    throw error;
                } else {
                    throw new Error('Server error');
                }
            }
        },
        onSuccess: () => {
            toast.success("Tweet deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['tweets'] })
        },
        onError: () => {
            toast.error("Error while Deleting")
        }
    })

    const { mutate: BookmarkMutation, isPending: isBookmarked } = useMutation({
        mutationKey: ['bookmark'],
        mutationFn: async () => {
            try {
                console.log("before bookmark");
                
                const res = await axios.put(`${BACKEND_URL}/tweets/bookmarkTweet/${tweet._id}`, {}, { withCredentials: true })
                console.log(res,"bookmark");
                
                return res.data.data;

            } catch (e: any) {
                console.error(e.message);
                toast.error("Error while bookmark")
            }

        },
        onSuccess: () => {
            toast.success("Added to Bookmarks")
            queryClient.invalidateQueries({ queryKey: ['tweets'] })
        }
    })
    
    const handleComments = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isCommenting) return;
        CommentMutation();
    };

    const handleLike = async () => {
        if (isLiking) return;
        LikeMutation()
    }
    const handleDelete = async () => {

        DeleteMutation();
    };

    const handleBookmark = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (isBookmarked) return;
        BookmarkMutation();
    }
    
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
                            <span className="ml-2">{tweet.comments?.length}</span>
                        </div>
                        <div
                            className="flex cursor-pointer  hover:text-green-600"
                        
                        >
                            <Repeat />
                        </div>
                        <div
                            className={`flex cursor-pointer ${authUser?._id && tweet.likes?.includes(authUser._id) ? 'text-pink-600' : 'hover:text-pink-600'}`}
                            onClick={handleLike}
                        >
                            <Heart />
                            <span className="ml-2">{tweet.likes?.length}</span>
                        </div>
                        <div
                            className={`flex cursor-pointer ${authUser?._id && tweet.Bookmark?.includes(authUser._id) ? 'text-blue-600' : 'hover:text-blue-600'}`}
                            onClick={handleBookmark}
                        >
                            <Bookmark />
                            <span className="ml-2">{tweet.Bookmark.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isModelOpen && (
                <CommentModel
                    onClose={toggleModel}
                    comments={tweet.comments}
                    onCommentSubmit={handleComments}
                    inputComment={inputComment}
                    setInputComment={setInputComment}
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
    setInputComment: (value: string) => void;
}

function CommentModel({
    onClose,
    comments,
    onCommentSubmit,
    inputComment,
    setInputComment,
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
                        onChange={(e) => setInputComment(e.target.value)}
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