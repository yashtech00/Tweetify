import axios from "axios";
import { User } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const CreateTweet = () => {
  const [tweet, setTweet] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmitTweet = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {

      const res = await axios.post(`${BACKEND_URL}/tweets/PostTweet`, {
        content: tweet,

      }, {
        withCredentials: true,
      });

      console.log(res);
      setTweet(""); // Clear the input after submission
      const id = res.data.data._id;
      navigate(`/tweet/${id}`); 

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
       
       <User className="w-12 h-12 rounded-full bg-white text-black p-2" />
        
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
              className="bg-violet-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-violet-600 mt-2"
            >
              Tweet
            </button>

          </div>

        </div>
      </form>
    </div>
  );
};