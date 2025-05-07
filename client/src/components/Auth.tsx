import axios, { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthProp } from "../types/type";


export const Auth = ({ type }: { type: "login" | "signup" }) => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [formsData, setFormsData] = useState<AuthProp>({
        username: "",
        fullname: "",
        password: "",
        email: "",
        Cover_Image: ""
    });

    const queryClient = useQueryClient();
    const { mutate: AuthMutation } = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ username,
            email,
            password,
            fullname,
            Cover_Image }: AuthProp) => {
            try {
                const res = await axios.post(`${BACKEND_URL}/user/${type}`, {
                    username,
                    email,
                    password,
                    fullname,
                    Cover_Image
                }, { withCredentials: true });
                console.log(res);
                queryClient.invalidateQueries({ queryKey: ["authUser"] });
                return res.data.data
            } catch (e) {
                console.error(e);
                if (axios.isAxiosError(e)) {
                    const errmsg = isAxiosError(e) ? e.response?.data?.message : "server is not responding"
                    toast.error(errmsg);
                } else {
                    toast.error("server is not responding")
                }
                return;
            }
        }
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        AuthMutation(formsData)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormsData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="h-screen flex justify-center items-center bg-black ">
            <div className="border-2 border-stone-800 rounded-xl w-full max-w-xl p-8 text-white">
                <h2 className="text-2xl font-bold text-center mb-6 ">
                    {type === "signup" ? "Sign up" : "Log in"} to Tweetify
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {type === "signup" ? (

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
                                    onChange={handleInputChange}
                                    name="username"
                                    value={formsData.username}
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
                                    onChange={handleInputChange}
                                    name="fullname"
                                    value={formsData.fullname}
                                    className="mt-1 block w-full px-4 py-2 border border-stone-800 rounded-md bg-black text-white"
                                    type="text"
                                />
                            </div>
                        </div>
                    ) : ("")}

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
                            onChange={handleInputChange}
                            name="email"
                            value={formsData.email}
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
                            onChange={handleInputChange}
                            name="password"
                            value={formsData.password}
                            className="mt-1 block w-full px-4 py-2 border border-stone-800 rounded-md bg-black text-white"
                            type="password"
                            required
                        />
                    </div>

                    {type === "signup" ? (
                        <div>
                            <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                            <input
                                type="text"
                                onChange={handleInputChange}
                                name="Cover_Image"
                                value={formsData.Cover_Image}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://..."
                            />
                        </div>

                    ) : ("")}


                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {type === "signup" ? "create account" : "Log in"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                    <Link to={`/${type === "signup" ? "login" : "signup"}`} className="text-blue-500 hover:underline">
                        {type === "signup" ? "login" : "signup"}
                    </Link>
                </p>
            </div>
        </div>
    )
}