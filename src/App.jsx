import { useEffect, useState, Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import { setUserData } from './redux/features/User/userSlice'
import { setWorkerData } from './redux/features/Worker/workerSlice'
import { setAdmin } from './redux/features/Admin/adminSlice'
import ServiceBookingForm from './pages/User/WorkerBooking'
import Notifications from './components/worker/Notifications'
import ServiceList from './pages/User/ServiceList'
import DashWorker from './components/worker/DashWorker'
import WorkCategoryComponent from './pages/User/ServiceViceWorkers'
import OTPVerification from './pages/Worker/OtpSecrion'
import LocationMapPage from './components/worker/LocationMapModal'
import Worker from './components/user/Worker'

const LandingPage = lazy(() => import('./pages/User/LandingPage'));
const SignUp = lazy(() => import('./pages/User/SignUp'));
const Login = lazy(() => import('./pages/User/Login'));
const WSignUp = lazy(() => import('./pages/Worker/WSignUp'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const OTPPage = lazy(() => import('./pages/User/OtpPage'));
const WorkerProfile = lazy(() => import('./pages/Worker/WorkerProfilie'));
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
const BookingStatusList = lazy(() => import('./components/user/BookingStatusList'));
const AddressPage = lazy(()=> import('./components/user/UserProfile/AddressPage'))

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
      <Suspense fallback={<div>
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        </svg>
          Processing...
      </div>}>
        <Routes>

          {/* user Route */}

          <Route path='/user/signUp' element={user?.isActive ? (<Navigate to='/' />) : (<SignUp />)} />
          <Route path='/user/login' element={user?.isActive ? (<Navigate to='/' />) : (<Login />)} />
          <Route path='/user/Otp' element={user?.isActive ? (<Navigate to='/' />) : (<OTPPage />)} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/user/Services' element={<ServiceList />} />
          <Route path='/user/Services/:cateName' element={<WorkCategoryComponent />} />
          <Route path='/user/WorkerDetails/:id' element={<WorkerDetailPage />}>
            <Route index element={<Navigate to='details' />} />
            <Route path='details' element={<Worker />} />
            <Route path='workerBooking' element={user?.isActive ? (<ServiceBookingForm  />) : (<Navigate to='/user/login' />)} />
          </Route>
          <Route path='/user/profile/:id' element={user?.isActive ? (<Profile user={user} />) : (<Navigate to='/user/login ' />)} >
            <Route index element={<Navigate to='editProfile' />} />
            <Route path='editProfile' element={<EditProfile />} />
            <Route path='notifications' element={<BookingStatusList />} />
            <Route path='security' element={<Security />} />
            <Route path='address' element={<AddressPage />} />
          </Route>

          {/* workerRoute */}

          <Route path='/worker/signUp' element={worker?.active ? (<Navigate to='/worker/profile' />) : (<WSignUp />)} />
          <Route path='/worker/otp' element={!worker ? (<OTPVerification />) : (<Navigate to='/worker/signUp' />)} />
          <Route path='/worker/profile' element={worker?.active ? (<WorkerProfile />) : (<Navigate to='/worker/signUp' />)} >
            <Route index element={<Navigate to='workerProfileEdit' />} />
            <Route path='workerProfileEdit' element={<ProfileForm />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='dash' element={<DashWorker/>} />
          </Route>
          {/* <Route path='/worker/select-location' element={<LocationMapPage />} /> */}
          {/* <Route path='/WorkerServices' element={worker.active?(<WorkerServices />):(<Navigate to='/WorkerProfile' />)} /> */}
          <Route path='/worker/services' element={<WorkerServices />} />

          {/* adminRoute */}

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