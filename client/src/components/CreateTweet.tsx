import axios from "axios";
import { useState } from "react";

export const CreateTweet = () => {
    const [tweet, setTweet] = useState("");

    const handleSubmitTweet = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from refreshing the page
        try {
            const res = await axios.post("http://localhost:5173/tweets/PostTweet", {
                content: tweet,
            });
            console.log(res);
            setTweet(""); // Clear the input after submission
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmitTweet}>
                <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-700 mb-2">What's Happening</p>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What's happening?"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        type="text"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};