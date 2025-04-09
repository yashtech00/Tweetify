import axios from "axios";
import { useState } from "react";

export const CreateTweet = () => {
    const [tweet, setTweet] = useState("");


    const handleSubmitTweet = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from refreshing the page
        try {
            const res = await axios.post("http://localhost:8001/tweets/PostTweet",
                { content: tweet },
                { withCredentials: true }
            );
            console.log(res);
            setTweet(""); // Clear the input after submission
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-4 border-b border-gray-200">
  <form onSubmit={handleSubmitTweet} className="flex space-x-4">
    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
    <div className="flex-1">
      <input
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="What's happening?"
        className="w-full text-lg border-none focus:ring-0 outline-none resize-none"
      />
      <div className="flex justify-end mt-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600">
          Tweet
        </button>
      </div>
    </div>
  </form>
</div>

    );
};