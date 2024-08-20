import { useState } from 'react'
import { useSelector } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Test from './pages/User/Test'


function App() {

  const worker = useSelector((state) => state.workerReducer.workerData)
  const user = useSelector((state) => state.userReducer.userData);

  return (

    <>
     <Routes>
      
      <Route path='/UserSignUp' element={user?.isActive?(<Navigate to='/'/>):(<SignUp/>)} />
      <Route path='/UserLogin' element={user?.isActive?(<Navigate to='/' />):(<Login/>)} />
      <Route path='/Otp' element={user?.isActive?(<Navigate to='/' />):(<OTPPage/>)} />a
      <Route path='/' element={<LandingPage />} />

      
      <Route path='/WorkerProfile' element={worker?.active?(<WorkerProfilie />):(<Navigate to='/WorkerSignUp' />)} />
      <Route path='/WorkerSignUp' element={worker?.active?(<Navigate to='/WorkerProfile' />):(<WSignUp />)} />
     
      

      <Route path='/AdminLogin' element={<AdminLogin />} />
      <Route path='/AdminPanel' element={<Container />} />

      <Route path='/test' element={<Test />} />

      {/* <Route path='/logout' */}
      <Route path='*' element={<NotFoundPage />} />
     </Routes>
    </>
  )
}

export default App
