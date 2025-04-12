import { FormEvent, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { formatTweetDate } from "../utils/date";
import { Bookmark, Heart, MessageCircle, Repeat, Trash, User } from "lucide-react";
import { useAuth } from "../hooks";


export interface Comment {
    _id: string;
    text: string;
    user: {
        _id: string;
        username: string;
        profileImg: string;
        fullname: string;
    };
}

export interface tweetProp {
    _id: string;
    text: string;
    
    user: {
    _id: string,
        username: string;
        profileImg: string;
        fullname: string;
    };
    comments: Comment[];
    likes: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface UserProp {
    _id: string;
    fullname: string;
    username: string;
  
}

function Tweet({ tweet }: { tweet: tweetProp }) {
    const {authUser} = useAuth();
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(tweet.likes);
  const [comments, setComments] = useState(tweet.comments);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

//   useEffect(() => {
//     const fetchAuthUser = async () => {
//       try {
//         const res = await axios.get("/api/auth/me");
//         setAuthUser(res.data);
//       } catch (err) {
//         console.error("Error fetching auth user", err);
//       }
//     };
//     fetchAuthUser();
//   }, []);

  const isMyTweet = authUser?._id === tweet.user._id;
  const isLiked = likes.includes(authUser?._id ?? "");
  const formattedDate = formatTweetDate(tweet.createdAt);

  const handleDeleteTweet = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:8001/tweets/DeteleTweet/${tweet._id}`);
      toast.success("tweet deleted successfully");
      window.location.reload(); // or lift state to parent to remove tweet from list
    } catch (error) {
      toast.error("tweet deletion failed");
    } finally {
      setIsDeleting(false);
    }
  };

const handleLikeTweet = async () => {
    if (isLiking) return;
    try {
        setIsLiking(true);
        const res = await axios.put(
            `http://localhost:8001/tweets/like/${tweet._id}`,
            {},
            { withCredentials: true }
        );
        setLikes(res.data); // assuming backend returns updated likes array
    } catch (error) {
        toast.error("tweet like failed");
    } finally {
        setIsLiking(false);
    }
};

  const handleTweetComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment || isCommenting) return;
    try {
      setIsCommenting(true);
      const res = await axios.put(
        `http://localhost:8001/tweets/comment/${tweet._id}`,
        { text: comment },
        {withCredentials:true}
      );
      setComments(res.data.comments); // assuming backend returns full tweet or updated comments
      setComment("");
    } catch (error) {
      toast.error("Commenting failed");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className='flex gap-2 items-start p-4 border-b border-gray-700'>
      <div className='avatar'>
        <Link to={`/profile/${tweet.user.username}`} className='w-8 rounded-full overflow-hidden'>
         <User/>
        </Link>
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex gap-2 items-center'>
          <Link to={`/profile/${tweet.user.username}`} className='font-bold'>
            {tweet.user.fullname}
          </Link>
          <span className='text-gray-700 flex gap-1 text-sm'>
            <Link to={`/profile/${tweet.user.username}`}>@{tweet.user.username}</Link>
            <span>·</span>
            <span>{formattedDate}</span>
          </span>
          {isMyTweet && (
            <span className='flex justify-end flex-1'>
              {!isDeleting ? (
                <Trash className='cursor-pointer hover:text-red-500' onClick={handleDeleteTweet} />
              ) : (
                <LoadingSpinner size='sm' />
              )}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-3 overflow-hidden'>
          <span>{tweet.text}</span>
          {/* {tweet.img && (
            <img
              src={tweet.img}
              className='h-80 object-contain rounded-lg border border-gray-700'
              alt=''
            />
          )} */} tweet image
        </div>

        <div className='flex justify-between mt-3'>
          <div className='flex gap-4 items-center w-2/3 justify-between'>
            <div
              className='flex gap-1 items-center cursor-pointer group'
              onClick={() => (document.getElementById("comments_modal" + tweet._id) as HTMLDialogElement)?.showModal()}
            >
              <MessageCircle className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
              <span className='text-sm text-slate-500 group-hover:text-sky-400'>{comments.length}</span>
            </div>

            <dialog id={`comments_modal${tweet._id}`} className='modal border-none outline-none'>
              <div className='modal-box rounded border border-gray-600'>
                <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                  {comments.length === 0 && (
                    <p className='text-sm text-slate-500'>No comments yet 🤔 Be the first one 😉</p>
                  )}
                  {comments.map((comment) => (
                    <div key={comment._id} className='flex gap-2 items-start'>
                      <div className='avatar'>
                        <div className='w-8 rounded-full'>
                          <img src={comment.user.profileImg || "/avatar-placeholder.png"} />
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-1'>
                          <span className='font-bold'>{comment.user.fullname}</span>
                          <span className='text-gray-700 text-sm'>@{comment.user.username}</span>
                        </div>
                        <div className='text-sm'>{comment.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                  onSubmit={handleTweetComment}
                >
                  <textarea
                    className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                    {isCommenting ? <LoadingSpinner size='md' /> : "tweet"}
                  </button>
                </form>
              </div>
              <form method='dialog' className='modal-backdrop'>
                <button className='outline-none'>close</button>
              </form>
            </dialog>

            <div className='flex gap-1 items-center group cursor-pointer'>
              <Repeat className='w-6 h-6 text-slate-500 group-hover:text-green-500' />
              <span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
            </div>

            <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikeTweet}>
              {isLiking && <LoadingSpinner size='sm' />}
              {!isLiked && !isLiking && (
                <Heart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
              )}
              {isLiked && !isLiking && (
                <Heart className='w-4 h-4 cursor-pointer text-pink-500 ' />
              )}
              <span
                className={`text-sm group-hover:text-pink-500 ${
                  isLiked ? "text-pink-500" : "text-slate-500"
                }`}
              >
                {likes.length}
              </span>
            </div>
          </div>

          <div className='flex w-1/3 justify-end gap-2 items-center'>
            <Bookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
