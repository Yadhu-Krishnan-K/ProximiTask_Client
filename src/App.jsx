import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import CustomerList from './components/admin/CustomerList';
import WorkerList from './components/admin/WorkerList';
import CategoryList from './components/admin/CategoryList';
import { setUserData } from './redux/features/User/userSlice'
import { setWorkerData } from './redux/features/Worker/workerSlice'
import { jwtDecode } from 'jwt-decode'
import { setAdmin } from './redux/features/Admin/adminSlice'
import Profile from './pages/User/Profile'
import EditProfile from './components/user/EditProfile'
import Security from './components/user/Security'
import WorkerDetailPage from './pages/User/WorkerDetailPage'

function App() {

  const worker = useSelector((state) => state.workerReducer.workerData)
  const user = useSelector((state) => state.userReducer.userData);
  const adminStatus = useSelector((state) => state.adminReducer.adminLogedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      dispatch(setUserData(JSON.parse(storedUser)));
    }

    const storedWorker = localStorage.getItem('workerData');
    console.log('storedWorker = === ', storedWorker)
    if (storedWorker) {

      dispatch(setWorkerData(JSON.parse(storedWorker)))
    }

    const storedAdmin = localStorage.getItem('adminLogedIn')
    if (storedAdmin) {
      dispatch(setAdmin())
    }
  }, []);



  return (

    <>
      <Routes>

        <Route path='/UserSignUp' element={user?.isActive ? (<Navigate to='/' />) : (<SignUp />)} />
        <Route path='/UserLogin' element={user?.isActive ? (<Navigate to='/' />) : (<Login />)} />
        <Route path='/Otp' element={user?.isActive ? (<Navigate to='/' />) : (<OTPPage />)} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/WorkerDetails' element={<WorkerDetailPage/>}>
          <Route index element={<Navigate to='WorkerServices' />} />
          
        </Route>
        


        <Route path='/WorkerProfile' element={worker?.active ? (<WorkerProfilie />) : (<Navigate to='/WorkerSignUp' />)} />
        <Route path='/WorkerSignUp' element={worker?.active ? (<Navigate to='/WorkerProfile' />) : (<WSignUp />)} />



        <Route path='/AdminLogin' element={!adminStatus ? (<AdminLogin />) : (<Navigate to="/AdminPanel" />)} />
        <Route path='/AdminPanel' element={adminStatus ? (<Container />) : (<Navigate to="/AdminLogin" />)} >
          <Route index element={<Navigate to='customers' />} />
          <Route path='customers' element={<CustomerList />} />
          <Route path='workers' element={<WorkerList />} />
          <Route path='categories' element={<CategoryList />} />
        </Route>

        {/* <Route path='/test' element={<Test />} /> */}

        <Route path='/Profile' element={<Profile />} >
          <Route index element={<Navigate to='editProfile' />} />
          <Route path='editProfile' element={<EditProfile />} />
          <Route path='security' element={<Security />} />
        </Route>

        {/* <Route path='/logout' */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes >
    </>
  )
}

export default App
