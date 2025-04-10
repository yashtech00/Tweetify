import axios from "axios"
import { useEffect, useState } from "react"

export const UserProfile = () => {

    const [profile, setProfile] = useState([]);
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:8001/profile/userProfile") 
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
            </div> 
        </div>
    )
}