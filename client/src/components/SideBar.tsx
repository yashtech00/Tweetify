import axios from "axios";
import { Home, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {

    const navigate = useNavigate();
    const handleLogout = async() => {
        try {
            const res = await axios.post("http://localhost:5173/user/logout")
            console.log(res);
            navigate("/login")
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="sticky w-[25%] p-6 border-r h-screen bg-gray-50 ">
            <div className="flex justify-end">
                <div className="flex flex-col items-start ">
                <span className="text-3xl font-extrabold text-blue-600 mb-6">Tweetify</span>
                <ul className="space-y-4 w-full">
                    <li className="p-4 font-semibold flex items-center rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition">
                        <Home className="mr-3" />
                        Home
                    </li>
                    <li className="p-4 font-semibold flex items-center rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition">
                        <User className="mr-3" />
                        Profile
                    </li>
                    </ul>
                    {/* <Link
						to={`/profile/${username}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
					> */}
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								{/* <img src={profileImg || "/avatar-placeholder.png"} /> */}
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>fullname</p>
								<p className='text-slate-500 text-sm'>@username</p>
							</div>
							<LogOut className='w-5 h-5 cursor-pointer' 
							onClick={handleLogout}
							/>

						</div>
					{/* </Link> */}
                    </div>
            </div>
        </div>
    );
};
