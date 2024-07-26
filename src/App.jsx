import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/User/LandingPage'
import SignUp from './pages/User/SignUp'
import Login from './pages/User/Login'
import WSignUp from './pages/Worker/WSignUp'
import AdminLogin from './pages/Admin/AdminLogin'
// import {AuthorizeUser,ProtectRoute} from './middleware/auth'

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/UserSignUp' element={<SignUp/>} />
      <Route path='/UserLogin' element={<Login/>} />
      <Route path='/WorkerSignUp' element={<WSignUp />} />
      <Route path='/AdminLogin' element={<AdminLogin />} />
     </Routes>
    </>
  )
}

export default App
