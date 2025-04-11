import axios from "axios"
import { useEffect, useState } from "react"
import { UserProp } from "../hooks";
import { useParams } from "react-router-dom";

export const UserProfile = () => {
  const [profile, setProfile] = useState<UserProp[]>([]);
    const { username } = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/profile/userProfile/${username}`, {
          withCredentials: true,
        });
          console.log(res.data.user,"profile");
        setProfile(res.data.user);
      } catch (e) {
        console.error(e);
      }
    };

    fetch();
  }, [username]);

  return (
    <div>
      <div className="border-b mt-20"></div>
      <div className="z-20 flex justify-center">
        <span className="rounded-full bg-gray-300 "></span>
      </div>
      {Array.isArray(profile) &&
        profile.map((data) => (
            <div key={data._id}>{data.fullname} { data.username}</div>
        ))}
    </div>
  );
};
