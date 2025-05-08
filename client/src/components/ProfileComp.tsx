import axios from "axios";
import { User } from "lucide-react";
import { useState } from "react";
import { Tweets } from "./Tweets";
import { useAuth } from "../hooks";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditModel } from "./EditProfile";
import { ProfileProp } from "../types/type";

export const UserProfile = () => {
    const { username } = useParams();
    const { authUser } = useAuth();
    const queryClient = useQueryClient();
    const [tweetType, setTweetType] = useState<string>("tweets");
    const [isModelOpen, setIsModelOpen] = useState(false);

    const [fullname, setFullname] = useState("");
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [link, setLink] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // ✅ Get profile data with React Query
    const { data: profile, isLoading } = useQuery<ProfileProp>({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axios.get(
                `${BACKEND_URL}/profile/userProfile/${authUser?.username}`,
                { withCredentials: true }
            );
            const profileData = res.data.data;

            // preload form states
            setFullname(profileData.fullname);
            setUsername(profileData.username);
            setEmail(profileData.email);
            setBio(profileData.bio);
            setLink(profileData.link);
            setCoverImage(profileData.Cover_Image);

            return profileData;
        },
        enabled: !!authUser?.username, // wait until username is ready
    });

    // ✅ Edit mutation
    const editMutation = useMutation({
        mutationKey: ["edit"],
        mutationFn: async (updatedProfile: Partial<ProfileProp>) => {
            const res = await axios.put(
                `${BACKEND_URL}/profile/editUserProfile`,
                updatedProfile,
                { withCredentials: true }
            );
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({queryKey: ["profile"]});
            setIsModelOpen(false);
        },
        onError: () => {
            toast.error("Error while editing. Please fill all the details.");
        },
    });

    const handleEdit = () => {
        const formData: Partial<ProfileProp> = {
            fullname,
            username: userName,
            email,
            bio,
            link,
            Cover_Image: coverImage,
        };
        editMutation.mutate(formData);
    };

    const handleToggle = () => {
        setIsModelOpen(!isModelOpen);
    };

    if (isLoading) return <div className="text-white text-center mt-10">Loading...</div>;

    return (
        <div className="text-white">
            <div className="max-w-4xl mx-auto mt-10">
                <div className="relative">
                    <div>
                        <img
                            src={
                                profile?.Cover_Image ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2oAhGJEYzkPuUse-b-qBVKq01KmW1pdCcaw&s"
                            }
                            alt="cover"
                            width={600}
                        />
                    </div>

                    <div className="flex justify-between mx-2 space-y-2">
                        <User className="w-20 h-20 rounded-full bg-white text-black p-2" />
                        <button
                            className="px-4 py-2 m-2 bg-black text-white border-2 border-stone-800 hover:bg-stone-900 rounded-2xl"
                            onClick={handleToggle}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-4 space-y-2">
                <div className="text-2xl font-bold">{profile?.fullname}</div>
                <div className="text-stone-500">@{profile?.username}</div>
                <div>{profile?.bio}</div>
                {profile?.link && (
                    <div className="mt-2 text-blue-500">
                        <a href={profile.link} target="_blank" rel="noopener noreferrer">
                            {profile.link}
                        </a>
                    </div>
                )}
                <div>
                    <span>{profile?.followers.length} <span className="mx-2 text-stone-500">Followers</span></span>
                    <span>{profile?.following.length} <span className="mx-2 text-stone-500">Following</span></span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row">
                <div
                    onClick={() => setTweetType("tweets")}
                    className={`flex-1 text-center py-3 cursor-pointer font-semibold ${
                        tweetType === "tweets"
                            ? "border-b-4 border-violet-500 text-violet-600"
                            : "text-white"
                    }`}
                >
                    Tweets
                </div>
                <div
                    onClick={() => setTweetType("likes")}
                    className={`flex-1 text-center py-3 cursor-pointer font-semibold ${
                        tweetType === "likes"
                            ? "border-b-4 border-violet-500 text-violet-600"
                            : "text-white"
                    }`}
                >
                    Likes
                </div>
            </div>

            <Tweets tweetType={tweetType} username={username} userId={profile?._id} />

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
                    Cover_Image={coverImage}
                    setCoverImage={setCoverImage}
                />
            )}
        </div>
    );
};
