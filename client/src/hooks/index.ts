import axios from "axios"
import { useEffect, useState } from "react"

export interface userProp{
  username: string,
  
}


export const userHook = () => {
  const [authUser, setAuthUser] = useState<userProp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axios.get('http://localhost:8001/user/me', { withCredentials: true })
        console.log(res.data.data);
        
        setAuthUser(res.data.data)
      } catch (err) {
        setAuthUser(null)
      } finally {
        setIsLoading(false)
        };
    };

    fetchAuthUser()
  }, [])

  return {
    authUser,
    isLoading
    }
}