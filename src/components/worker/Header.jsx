import React from 'react';
import logOutHeloper from '../../helper/logoutHelper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkerData } from '../../redux/features/Worker/workerSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const worker = useSelector((state)=>state.workerReducer.workerData)
  const dispatch = useDispatch()
  const nav = useNavigate()
function logout(){
  localStorage.removeItem('workerData')
  logOutHeloper('worker')
  dispatch(deleteWorkerData())
  // nav('/WorkerSignUp')
  window.location.href = '/worker/signup'
}

 return (
  <header className="bg-white w-full shadow-md flex justify-between items-center">
    <div className="flex items-center justify-between w-full">
      <img src="/logo.png" alt="Logo"  className="w-52 mr-2" />
      <nav>
        <ul className="flex space-x-4">
          <li className='cursor-pointer' onClick={()=>nav('/worker/profile')}>PROFILE</li>
          <li className='cursor-pointer' onClick={()=>nav('/worker/services')}>SERVICES</li>
          <li className='cursor-pointer'>CHAT</li>
          <li className='cursor-pointer'>
            <div className="flex items-center">
              <span className="mr-2 cursor-pointer" onClick={logout}>{worker.name}</span>
              {/* <img src="profile-pic.jpg" alt="Profile" className="h-10 w-10 rounded-full" /> */}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  );
}

export default Header;