import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkerData } from '../../redux/features/Worker/workerSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const worker = useSelector((state) => state.workerReducer.workerData);
  const dispatch = useDispatch();
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem('workerData');
    logOutHeloper('worker');
    dispatch(deleteWorkerData());
    window.location.href = '/worker/signup';
  }

  return (
    <header className="bg-white w-full shadow-md flex justify-between items-center">
      <div className="flex items-center justify-between w-full px-4 ">
        <img src="/logo.png" alt="Logo" className="w-52 mr-2" />
        <nav>
          <ul className="flex space-x-8 items-center">
            <li className="cursor-pointer hover:text-cyan-400" onClick={() => nav('/worker/profile')}>
              PROFILE
            </li>
            <li className="cursor-pointer hover:text-cyan-400" onClick={() => nav('/worker/services')}>
              SERVICES
            </li>
            <li className="cursor-pointer hover:text-cyan-400">
              CHAT
            </li>
            <li className="relative">
              <button
                className="flex items-center cursor-pointer hover:text-cyan-400"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{worker.name}</span>
                <span className="text-xs ml-1">▼</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded shadow-lg">
                  <div 
                    className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;