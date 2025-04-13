import axios from "axios"
import { User } from "lucide-react";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";

interface NotifyProp {
    _id:string
    from: string,
    type: ["follow", "Like"],
    
}



export const Notify = () => {

    const { authUser } = useAuth();
    const [notifyAll, setNotifyAll] = useState<NotifyProp[]>([])

    useEffect(() => {
        const handleNotify = async() => {
            try {
                const res = await axios.get("http://localhost:8001/notify/notification", { withCredentials: true });
                console.log(res);
                
            } catch (e) {
                console.error(e);
                
            }
        }
        handleNotify();
    },[])
   



    return (
        <div>
            <div>
                <div>
                <span>Notification</span>
                </div>
                <div>
                    <div>
                        <div className="bg-gray-300 rounded-full w-6 h-6"><User /></div>
                        <div>{authUser?.username}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}