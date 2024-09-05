import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const ProfileNavBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600 ">
            <IoMenu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <div onClick={() => navigate('/')} className="text-blue-600 hidden sm:inline cursor-pointer">HOME</div>
            <div onClick={() => navigate('/services')} className="text-blue-600 hidden sm:inline cursor-pointer">SERVICES</div>
            <div onClick={() => navigate('/chat')} className="text-blue-600 hidden sm:inline cursor-pointer">CHAT</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <FaRegUserCircle className="h-5 w-5 text-gray-600" />
              </div>
              <span className="hidden sm:inline">User</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNavBar