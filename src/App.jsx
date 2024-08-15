import { useState } from 'react'
import { useSelector } from 'react-redux'
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
import Test from './pages/User/Test'


function App() {

  const worker = useSelector((state) => state.workerReducer.workerData)
  const user = useSelector((state) => state.userReducer.userData);

  return (

    <>
     <Routes>
      {
      !user?
        (
        <>
          <Route path='/UserSignUp' element={<SignUp/>} />
          <Route path='/UserLogin' element={<Login/>} />
          <Route path='/Otp' element={<OTPPage/>} />
        </>
        )
        :
        null
      }
      <Route path='/' element={<LandingPage />} />

      {worker?.active
      ?
      (<Route path='/WorkerProfile' element={<WorkerProfilie />} />)
      :
      (<Route path='/WorkerSignUp' element={<WSignUp />} />)
      }
      

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
