import { Home, User } from "lucide-react"

export const HomeComp = () => {
    

    return (
        <div>
            <div className=" sticky w-[35%] p-4 border-r-2  h-screen">
               <div className=" flex justify-end">
                <div >
                <span className="p-4 text-2xl font-bold">Tweetify</span>
                <ul className="mt-4">
                            <li className="p-4 font-semibold flex">
                                <Home className="mx-2"/>
                                Home
                            </li>
                            <li className="p-4 font-semibold flex">
                                <User className="mx-2"/>
                                Profile</li>
                    
                    </ul>
                    </div>
                    </div>
            </div>
        </div>
    )
}