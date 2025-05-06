import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface UserProp {
  username: string;
  fullname: string;
  bio: string;
  link: string;
  email: string;
  _id: string;
  profile_Image: string;
  Cover_Image: string;
  followers: string[];
}

interface AuthContextType {
  authUser: UserProp | null;
  setAuthUser: (user: UserProp | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<UserProp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/user/me`, { withCredentials: true });
        setAuthUser(res.data.data);
        toast.success("Welcome back");
      } catch (err) {
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
