
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const SignupComp = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/user/signup`, {
                username,
                email,
                password,
                fullname,
                profile_Image:profileImage,
                Cover_Image:coverImage
            },{withCredentials:true})
            console.log(res);

            setFullname("")
            setEmail("")
            setPassword("")
            setUsername("")
            setProfileImage("")
            setCoverImage("")
            navigate("/");
            toast.success("Signup successfully, Welcome to Tweetify")
        } catch (e:any) {
            console.error(e.message);
            toast.error("Error while creating account, or account already exist")
        }
    };
    return (
        <div className="h-screen flex justify-center items-center bg-black ">
            <div className="border-2 border-stone-800 rounded-xl w-full max-w-xl p-8 text-white">
                <h2 className="text-2xl font-bold text-center mb-6 ">
                    Signup to Tweetify
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between space-x-3 mb-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-stone-800 rounded-md bg-black text-white"
                            type="text"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="Fullname"
                            className="block text-sm font-medium "
                        >
                            Full Name
                        </label>
                        <input
                            id="fullname"
                            placeholder="Enter your Fullname"
                            onChange={(e) => setFullname(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-stone-800 rounded-md bg-black text-white"
                            type="text"
                        />
                        </div>
                        </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-stone-800 rounded-md bg-black text-white"
                            type="email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium "
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-stone-800 rounded-md bg-black text-white"
                            type="password"
                            required
                        />
                    </div>
                    <div className="flex space-x-3 mb-4">
                    <div>
                            <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                            <input
                                type="text"
                                value={profileImage}
                                onChange={(e) => setProfileImage(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                            <input
                                type="text"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://..."
                            />
                        </div>
                        </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Create Account
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}