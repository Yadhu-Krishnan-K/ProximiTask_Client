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
  window.location.href = '/WorkerSignUp'
}

 return (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="flex items-center">
      <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
      <nav>
        <ul className="flex space-x-4">
          <li>PEOPLE</li>
          <li>SERVICES</li>
          <li>CHAT</li>
        </ul>
      </nav>
    </div>
    <div className="flex items-center">
      <span className="mr-2 cursor-pointer" onClick={logout}>{worker.name}</span>
      {/* <img src="profile-pic.jpg" alt="Profile" className="h-10 w-10 rounded-full" /> */}
    </div>
  </header>
  );
}

export default Header;