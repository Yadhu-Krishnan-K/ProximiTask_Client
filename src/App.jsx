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
import NotFoundPage from './pages/NotFound'
import OTPPage from './pages/User/OtpPage'
import WorkerProfilie from './pages/Worker/WorkerProfilie'
import Container from './pages/Admin/Container'

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/UserSignUp' element={<SignUp/>} />
      <Route path='/UserLogin' element={<Login/>} />
      <Route path='/Otp' element={<OTPPage/>} />

      <Route path='/WorkerSignUp' element={<WSignUp />} />
      <Route path='/WorkerProfile' element={<WorkerProfilie />} />

      <Route path='/AdminLogin' element={<AdminLogin />} />
      <Route path='/AdminPanel' element={<Container />} />

      <Route path='*' element={<NotFoundPage />} />
     </Routes>
    </>
  )
}

export default App
