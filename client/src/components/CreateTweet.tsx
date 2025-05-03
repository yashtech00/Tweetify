import axios from "axios";
import { User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const CreateTweet = () => {
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmitTweet = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const formData = new FormData();
      formData.append("content", tweet);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(`${BACKEND_URL}/tweets/PostTweet`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      setTweet(""); // Clear the input after submission
      setImage(null);
      toast.success("Your post was sent");
    } catch (e) {
      console.error(e);
      toast.error("Failed to send your post");
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
          <div className="flex items-center justify-between mt-2">
            <label className="text-sm text-gray-500">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
            </label>
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