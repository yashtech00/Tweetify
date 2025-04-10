import axios from "axios"
import { useEffect, useState } from "react"
import { UserProp } from "../hooks";



export const UserProfile = () => {

    const [profile, setProfile] = useState<UserProp[]>([]);
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:8001/profile/userProfile", { withCredentials: true })
                console.log(res.data,"profile");
                
                setProfile(res.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetch()
    },[])



    return (
        <div>
            <div>
                <div className="border-b mt-20"></div>
                <div className="z-20 flex justify-center"><span className="rounded-full bg-gray-300 "></span></div>
                {profile.map((data) => (
                    <div key={data._id}>
                        {data.fullname}

                    </div>
                ))}
            </div> 

        </div>
    )
}