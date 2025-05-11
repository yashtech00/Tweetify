import {  BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import { useAuth } from './hooks'
import Profile from './pages/Profile'
import Notification from './pages/Notification'
import { Toaster } from 'react-hot-toast'
import Layout from './layout/Layout'
import Bookmark from './pages/Bookmark'


function App() {
  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
       Loading..
      </div>
    )
  }

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <Layout><Home /></Layout> :<Navigate to="/login" /> } />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/notifications" element={authUser ? <Layout><Notification /></Layout> : <Navigate to="/" />} />
        <Route path="/profile/:username" element={authUser ? <Layout><Profile /></Layout> : <Navigate to="/" />} />
        <Route path="/bookmark" element={authUser ? <Layout><Bookmark /></Layout> : <Navigate to="/" />} />
       
      </Routes>

      <Toaster position="bottom-center" toastOptions={{
        className: "bg-violet-500 text-white",
        duration: 2000,
        style: {
          backgroundColor: '#3b0968',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
          border: '2px solid stone-900'
        }
      }} />
      </BrowserRouter>
  )
}

export default App
