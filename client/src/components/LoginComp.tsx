
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const LoginComp = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8001/user/login", {
                email,password
            },{withCredentials:true})
            console.log(res);

           setAuthUser(res.data.user)
            setEmail("")
            setPassword("")
            navigate("/");
        } catch (e:any) {
            console.error(e.message);
            
        }
    };
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="text-white border-2 rounded-xl border-stone-900 w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 ">
                    Login to Tweetify
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium "
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
                            className="block text-sm font-medium"
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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login in
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    )
}