import axios from "axios";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

import { Tweets } from "./Tweets";
import { useAuth } from "../hooks";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface ProfileProp {
    _id: string
    fullname: string;
    username: string;
    email: string;
    bio: string;
    link: string;
    profile_Image: string;
    Cover_Image: string;
    following: []
    followers: []
    likedTweets: [],
    tweets: {
        content: string,
        likes: [],
        comment: []
    }
}

export const UserProfile = () => {

    const { username } = useParams();
    const [profile, setProfile] = useState<ProfileProp | null>(null);

    const [tweetType, setTweetType] = useState<string>("tweets")
    const [isModelOpen, setIsModelOpen] = useState(false);

    const [fullname, setFullname] = useState("");
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [link, setLink] = useState("");
    const [profile_Image, setProfileImage] = useState("");
    const [Cover_Image, setCoverImage] = useState("");

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleEdit = async () => {
        const formData = {
            fullname,
            username: userName,
            email,
            bio,
            link,
            profile_Image,
            Cover_Image
        };

        try {
            const res = await axios.put(
                `${BACKEND_URL}/profile/editUserProfile`,
                formData,
                { withCredentials: true }
            );

            const updatedData = res.data.data;

            setFullname(updatedData.fullname);
            setUsername(updatedData.username);
            setEmail(updatedData.email);
            setBio(updatedData.bio);
            setLink(updatedData.link);
            setProfileImage(updatedData.profile_Image);
            setCoverImage(updatedData.Cover_Image);

            // Optionally, update profile to reflect changes immediately
            setProfile((prev) =>
                prev ? { ...prev, ...updatedData } : updatedData
            );

            // Close the modal after successful update
            setIsModelOpen(false);
            toast.success("Profile edit successfully")
        } catch (e) {
            console.error("Failed to update profile:", e);
            toast.error("Error while editing, Please fill all the details")
        }
    };


    const handleToggle = () => {
        setIsModelOpen(!isModelOpen);
    };
    const { authUser } = useAuth();


    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(
                    `${BACKEND_URL}/profile/userProfile/${authUser?.username}`,
                    {
                        withCredentials: true,
                    }
                );
                console.log(res, "profile");

                setProfile(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetch();
    }, [authUser?.username]);

    return (

        <div className="text-white">
            <div className="max-w-4xl mx-auto mt-10">
                <div className="relative">
                    <div className=" ">
                        <img 
                            src={profile?.Cover_Image 
                                ? profile.Cover_Image 
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2oAhGJEYzkPuUse-b-qBVKq01KmW1pdCcaw&s"} 
                            alt="cover photo" 
                            width={600} 
                        />
                    </div>
                    {/* Profile Picture */}
                  
                    <div className="flex justify-between mx-2 space-y-2">

                        <User className="w-20 h-20 rounded-full bg-gray-400 text-black" />
                        <div>
                            <button className="px-4 py-2 m-2 bg-black text-white border-2 border-stone-800 hover:bg-stone-900 rounded-2xl" onClick={handleToggle}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-white ">
                {/* Profile Info */}
                {profile && (
                    <div className="px-4 space-y-2">
                        <div className="text-2xl font-bold">{profile.fullname}</div>
                        <div className="text-stone-500">@{profile.username}</div>
                        <div className="">{profile.bio}</div>
                        {profile.link && (
                            <div className="mt-2 text-blue-500">
                                <a href={profile.link} target="_blank" rel="noopener noreferrer">
                                    {profile.link}
                                </a>
                            </div>
                        )}

                        <div className="">
                            <span className="space-x-2">{profile.followers.length}
                                <span className="mx-2 text-stone-500">Followers</span>
                            </span>
                            <span className="space-x-2 ">{profile.following.length}
                                <span className="mx-2 text-stone-500">Following</span>

                            </span>
                        </div>
                    </div>
                )}


                {/* Tabs */}
                <div className='flex w-full border-b border-stone-800 mt-4'>
                    <div
                        className='flex justify-center flex-1 p-3 hover:bg-stone-900 transition duration-300 relative cursor-pointer'
                        onClick={() => setTweetType("tweets")}
                    >
                        Tweet
                        {tweetType === "tweets" && (
                            <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
                        )}
                    </div>
                    <div
                        className='flex justify-center flex-1 p-3 hover:bg-stone-900 transition duration-300 relative cursor-pointer'
                        onClick={() => setTweetType("likes")}
                    >
                        Likes
                        {tweetType === "likes" && (
                            <div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
                        )}
                    </div>
                </div>
                <Tweets tweetType={tweetType} username={username} userId={profile?._id} />
            </div>
            {isModelOpen && (
                <EditModel
                    onClose={handleToggle}
                    onSubmit={handleEdit}
                    fullName={fullname}
                    setFullName={setFullname}

                    userName={userName}
                    setUserName={setUsername}


                    email={email}
                    setEmail={setEmail}
                    bio={bio}
                    setBio={setBio}
                    link={link}
                    setLink={setLink}
                    profile_Image={profile_Image}
                    setProfileImage={setProfileImage}
                    Cover_Image={Cover_Image}
                    setCoverImage={setCoverImage}
                />
            )}
        </div>
    );
};

interface EditModelProps {
    onClose: () => void;
    onSubmit: () => void;
    fullName: string;
    setFullName: (value: string) => void;
    userName: string;
    setUserName: (value: string) => void;

    email: string;
    setEmail: (value: string) => void;
    bio: string;
    setBio: (value: string) => void;
    link: string;
    setLink: (value: string) => void;
    profile_Image: string;
    setProfileImage: (value: string) => void;
    Cover_Image: string;
    setCoverImage: (value: string) => void;
}

function EditModel({
    onClose,
    onSubmit,
    fullName,
    setFullName,
    userName,
    setUserName,

    email,
    setEmail,
    bio,
    setBio,
    link,
    setLink,
    profile_Image,
    setProfileImage,
    Cover_Image,
    setCoverImage,
}: EditModelProps) {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-20 flex justify-center items-center">
            <div className="bg-black p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-3 py-2 border border-stone-900 rounded bg-black text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">User Name</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your user name"
                            className="w-full px-3 py-2 border border-stone-900 rounded bg-black text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-stone-900 rounded bg-black text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Enter your bio"
                            className="w-full px-3 py-2 border border-stone-900 rounded bg-black text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Link</label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter your link"
                            className="w-full px-3 py-2 border border-stone-900 rounded bg-black text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                        <input
                            type="text"
                            value={profile_Image}
                            onChange={(e) => setProfileImage(e.target.value)}
                            placeholder="Enter your profile image URL"
                            className="w-full px-3 py-2 border border-stone-900 rounded bg-black text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                        <input
                            type="text"
                            value={Cover_Image}
                            onChange={(e) => setCoverImage(e.target.value)}
                            placeholder="Enter your cover image URL"
                            className="w-full px-3 py-2 border border-stone-900 rounded bg-black text-white"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-black border-2 border-stone-900 text-white hover:bg-stone-900 px-4 py-2 rounded mr-2"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
