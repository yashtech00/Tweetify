import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { SideBar } from './components/SideBar'
import { RightSideBar } from './components/RightSideBar'
import Login from './pages/Login'

import { useAuth } from './hooks'
import Profile from './pages/Profile'
import Notification from './pages/Notification'
import { Toaster } from 'react-hot-toast'
import LoadingSpinner from './components/LoadingSpinner'


function App() {
  const { authUser, isLoading } = useAuth();

  

  if (isLoading){
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  } 

  return (
    <BrowserRouter>
      <div className="flex justify-center w-full bg-black min-h-screen">
        <div className="flex w-full max-w-6xl">
          {authUser && <SideBar/>}
          <div className="flex-1 border-x border-stone-800 bg-black ">
            <Routes>
              <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
              <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
              <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
              <Route path="/notifications" element={authUser ? <Notification /> : <Navigate to="/" />} />
              <Route path="/profile/:username" element={authUser ? <Profile /> : <Navigate to="/" />} />
            </Routes>
          </div>
          {authUser && <RightSideBar />}
          <Toaster position="bottom-right" toastOptions={{
            className: "bg-black",
            style: {
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid stone-900'
            }
          }}/>
        </div>
      </div>

    </BrowserRouter>
  )
}

export default App
