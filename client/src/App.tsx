
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SideBar } from './components/SideBar'
import { RightSideBar } from './components/RightSideBar'
import Login from './pages/Login'

function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:8000/user/me");
        console.log(res,"app res");
        
        return res.data.user;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    retry:false
  })

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
        {!authUser && <SideBar/>}
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/home' element={!authUser ? <Home /> : <Navigate to={"/Signup"}/>}/>
        </Routes>
          {!authUser && <RightSideBar />}
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
