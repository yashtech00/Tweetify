import axios from "axios";
import { Image, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tweets } from "./Tweets";

interface ProfilePro {
    fullname: string;
    username: string;
    bio: string;
    link: string;
    following: []
    followers: []
    likedTweets: [],
    tweets: {
        content: string,
        likes: [],
        comment:[]
    }
}

export const UserProfile = () => {
    const [profile, setProfile] = useState<ProfilePro | null>(null);
    console.log(profile, "user profile");
    const [tweetType,setTweetType] = useState<string>("tweets")

    const { username } = useParams();
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8001/profile/userProfile/${username}`,
                    {
                        withCredentials: true,
                    }
                );
                console.log(res.data.user, "profile");
                setProfile(res.data.user);
            } catch (e) {
                console.error(e);
            }
        };

        fetch();
    }, [username]);

    return (
        
        <div>
            <div className="max-w-4xl mx-auto mt-10">
                <div className="relative">
                    {/* Cover Photo */}


                    <div className="h-48 bg-gray-300 flex items-center justify-center w-full "><Image className="w-20 h-20 "/></div>

                    {/* Profile Picture */}
                    <div className="absolute -bottom-16 left-6"></div>
                    <div className="flex justify-between">
                        
                        <User className="w-20 h-20 rounded-full bg-gray-400 border-4 border-white"/>
                        <div>
                            <button className="px-4 py-2 m-2 bg-black text-white rounded-2xl">Edit Profile</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div className=" px-6">
                    {/* Profile Info */}
                    {profile && (
                        <div>
                            <div className="text-2xl font-bold">{profile.fullname}</div>
                            <div className="text-gray-500">@{profile.username}</div>
                            <div className="mt-4">{profile.bio}</div>
                            {profile.link && (
                                <div className="mt-2 text-blue-500">
                                    <a href={profile.link} target="_blank" rel="noopener noreferrer">
                                        {profile.link}
                                    </a>
                                </div>
                        )}
                       
                        <div>
                            <span className="mx-2">Followers
                                <span className="mx-1">{profile.followers.length}</span>
                            </span>
                            <span className="mx-2">Following
                                <span className="mx-1">{profile.following.length}</span>

                                </span>
                        </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            Follow
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100">
                            Message
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className='flex w-full border-b border-gray-700 mt-4'>
								<div
									className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer'
									onClick={() => setTweetType("tweets")}
								>
									Tweet
									{tweetType === "posts" && (
										<div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
									)}
								</div>
								<div
									className='flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer'
									onClick={() => setTweetType("likes")}
								>
									Likes
									{tweetType === "likes" && (
										<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
									)}
								</div>
                </div>
             <Tweets tweetType={tweetType } username={profile?.username} userId={profile?._id}/>
                </div>
            </div>
    );
};
