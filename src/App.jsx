import { useEffect, useState, Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import { setUserData } from './redux/features/User/userSlice'
import { setWorkerData } from './redux/features/Worker/workerSlice'
import { setAdmin } from './redux/features/Admin/adminSlice'

const LandingPage = lazy(() => import('./pages/User/LandingPage'));
const SignUp = lazy(() => import('./pages/User/SignUp'));
const Login = lazy(() => import('./pages/User/Login'));
const WSignUp = lazy(() => import('./pages/Worker/WSignUp'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const OTPPage = lazy(() => import('./pages/User/OtpPage'));
const WorkerProfile = lazy(() => import('./pages/Worker/WorkerProfile'));
const Container = lazy(() => import('./pages/Admin/Container'));
const Test = lazy(() => import('./pages/User/Test'));
const CustomerList = lazy(() => import('./components/admin/CustomerList'));
const WorkerList = lazy(() => import('./components/admin/WorkerList'));
const CategoryList = lazy(() => import('./components/admin/CategoryList'));
const Profile = lazy(() => import('./pages/User/Profile'));
const EditProfile = lazy(() => import('./components/user/EditProfile'));
const Security = lazy(() => import('./components/user/Security'));
const WorkerDetailPage = lazy(() => import('./pages/User/WorkerDetailPage'));
const WorkerServices = lazy(() => import('./components/user/WorkerServices'));
const ProfileForm = lazy(() => import('./components/worker/ProfileForm'));
const LocationManagement = lazy(() => import('./components/admin/LocationManagement'));

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
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route path='/user/signUp' element={user?.isActive ? (<Navigate to='/' />) : (<SignUp />)} />
        <Route path='/user/login' element={user?.isActive ? (<Navigate to='/' />) : (<Login />)} />
        <Route path='/user/Otp' element={user?.isActive ? (<Navigate to='/' />) : (<OTPPage />)} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/user/WorkerDetails/:id' element={<WorkerDetailPage />}>
          <Route index element={<Navigate to='WorkerServices' />} />
          <Route path='WorkerServices' element={<WorkerServices />} />
        </Route>
        <Route path='/user/profile' element={<Profile />} >
          <Route index element={<Navigate to='editProfile' />} />
          <Route path='editProfile' element={<EditProfile />} />
          <Route path='security' element={<Security />} />
        </Route>



        <Route path='/worker/signUp' element={worker?.active ? (<Navigate to='/worker/profile' />) : (<WSignUp />)} />
        <Route path='/worker/profile' element={worker?.active ? (<WorkerProfilie />) : (<Navigate to='/worker/signUp' />)} >
          <Route index element={<Navigate to='workerProfileEdit' />} />
          <Route path='workerProfileEdit' element={<ProfileForm />} />
        </Route>
        {/* <Route path='/WorkerServices' element={worker.active?(<WorkerServices />):(<Navigate to='/WorkerProfile' />)} /> */}
        <Route path='/worker/services' element={<WorkerServices />} />



        <Route path='/admin/login' element={!adminStatus ? (<AdminLogin />) : (<Navigate to="/admin/panel" />)} />
        <Route path='/admin/panel' element={adminStatus ? (<Container />) : (<Navigate to="/admin/login" />)} >
          <Route index element={<Navigate to='customers' />} />
          <Route path='customers' element={<CustomerList />} />
          <Route path='workers' element={<WorkerList />} />
          <Route path='categories' element={<CategoryList />} />
          <Route path='location' element={<LocationManagement />} />
        </Route>

        {/* <Route path='/test' element={<Test />} /> */}


        {/* <Route path='/logout' */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes >
    </Suspense>
    </>
  )
}

export default App
