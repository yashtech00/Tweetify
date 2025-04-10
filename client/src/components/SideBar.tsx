import axios from "axios";
import { Bell, Home, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userHook } from "../hooks";

export const SideBar = () => {

  const navigate = useNavigate();
  const { authUser } = userHook();
    const handleLogout = async() => {
        try {
            const res = await axios.post("http://localhost:8001/user/logout")
            console.log(res);
            navigate("/login")
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="sticky top-0 w-64 h-screen p-6 border-r bg-white flex flex-col justify-between">
  <div>
    <h1 className="text-3xl font-bold text-blue-500 mb-8">Tweetify</h1>
    <ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<Home className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<Bell className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${authUser?.username}`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<User className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    <div className="flex-1">
            <p className="font-semibold text-sm text-gray-800 truncate">{authUser?.username}</p>
      <p className="text-sm text-gray-500">@username</p>
    </div>
    <LogOut className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer" onClick={handleLogout} />
  </div>
</div>

    );
};
