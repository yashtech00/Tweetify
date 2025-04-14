import axios from "axios";
import { User } from "lucide-react";
import { useState } from "react";

export const CreateTweet = () => {
  const [tweet, setTweet] = useState("");
  const BACKEND_URL = process.env.BACKEND_URL;

  const handleSubmitTweet = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const res = await axios.post(
        `${BACKEND_URL}/tweets/PostTweet`,
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
    <div className="p-4 border-b border-stone-800 bg-black">
      <form
        onSubmit={handleSubmitTweet}
        className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-4 my-6"
      >
        <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center mx-auto sm:mx-0">
          <User />
        </div>
        <div className="flex-1">
          <div className="border-b border-stone-800">
            <input
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="What's happening?"
              className="w-full text-lg border-none focus:ring-0 outline-none resize-none bg-black text-white mt-2 mb-4"
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 mt-2"
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};