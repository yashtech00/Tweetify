import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import axios from 'axios'
import { SideBar } from './components/SideBar'
import { RightSideBar } from './components/RightSideBar'
import Login from './pages/Login'
import { useEffect, useState } from 'react'

function App() {
  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
      }
    }

    fetchAuthUser()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <div className="flex justify-center w-full bg-gray-100 min-h-screen">
  <div className="flex w-full max-w-6xl">
    {authUser && <SideBar />}
    <div className="flex-1 border-x border-gray-300 bg-white">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
    {authUser && <RightSideBar />}
  </div>
</div>

    </BrowserRouter>
  )
}

export default App
