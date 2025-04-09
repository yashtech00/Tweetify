
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import axios from 'axios'
import { SideBar } from './components/SideBar'
import { RightSideBar } from './components/RightSideBar'
import Login from './pages/Login'
import { useEffect, useState } from 'react';

function App() {

  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        console.log("before me");
        
        const res = await fetch("http://localhost:8001/user/me", {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          credentials: "include" // Use credentials option to include cookies
        })
        const jsonData = await res.json();
        console.log(jsonData);
        
        setAuthUser(jsonData.data); // Use the response to set the authenticated user
        
      } catch (error: any) {
        console.error(error.message);
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  if (isLoading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div >
      
      <BrowserRouter>
        <div className='flex max-w-6xl mx-auto'>
        {authUser && <SideBar/>}
        <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
       <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={'/'} />}/>
       <Route path="/login" element={!authUser ? <Login /> : <Navigate to={'/'} />}/>
        </Routes>
          {authUser && <RightSideBar />}
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
