import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

export interface UserProp {
  username: string,
  fullname: string,
  bio: string,
  link: string,
  email: string
  _id:string
}

interface AuthContextType {
  authUser: UserProp | null
  setAuthUser: (user: UserProp | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<UserProp | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const BACKEND_URL = process.env.BACKEND_URL;

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/user/me`, { withCredentials: true })
        setAuthUser(res.data.data)
      } catch (err) {
        setAuthUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuthUser()
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
