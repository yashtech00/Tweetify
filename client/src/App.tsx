
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {


  return (
    <div >
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/home' element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
