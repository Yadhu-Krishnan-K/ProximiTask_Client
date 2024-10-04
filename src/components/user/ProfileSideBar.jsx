import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, NavLink, useLocation, useParams } from 'react-router-dom'
import { ImPencil } from "react-icons/im";
import { FaRegBell, FaRegUserCircle, FaCamera } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { IoHelpCircleOutline, IoClose } from "react-icons/io5";
// import { FaRegUserCircle } from "react-icons/fa";


import { BiExit } from "react-icons/bi";

const ProfileSideBar = ({ isOpen, toggleSidebar, user }) => {
  const {id} = useParams()
  useEffect(()=>{
    
  },[])
  const navigate = useNavigate();

  return (
    <div className={`bg-white shadow-md fixed left-0 top-0 bottom-0 z-30 w-64 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Settings</h2>
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600">
          <IoClose className="h-6 w-6" />
        </button>
      </div>
      <div className="w-full h-32 flex justify-center items-center relative">
        {/* <img src="" alt="ProfileImg" /> */}
        {user
        ? (<img src={user.croppedImgURL} alt='userImgage' className='rounded-full h-20 w-20' />)
        : (<FaRegUserCircle className="w-2/3 h-2/3" />)
        }
        <button className="rounded-full border-2 border-black w-7 h-7 flex justify-center items-center absolute bottom-5 right-20 bg-white">
          <FaCamera className="text-cyan-400 bg-white"/>
        </button>
      </div>
      <nav className="mt-4">
        <NavLink to={`/user/profile/${id}/editProfile`} className={({isActive})=>(
          isActive
          ?("flex items-center px-4 py-2 text-gray-700 bg-gray-200 cursor-pointer")
          :("flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer")
        )}>
        
          <ImPencil className="mr-3 h-5 w-5" />
          Edit profile
        </NavLink>
        <NavLink to={`/user/profile/${id}/notifications`} className={({isActive})=>(
          isActive
          ?("flex items-center px-4 py-2 text-gray-700 bg-gray-200 cursor-pointer")
          :("flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer")
        )}>
          <FaRegBell className="mr-3 h-5 w-5" />
          Notification
        </NavLink>
        <NavLink to={`/user/profile/${id}/security`} className={({isActive})=>(
          isActive
          ?("flex items-center px-4 py-2 text-gray-700 bg-gray-200 cursor-pointer")
          :("flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer")
        )}>
          <MdLockOutline className="mr-3 h-5 w-5" />
          Security
        </NavLink>
        <NavLink to={`/user/profile/${id}/help`} className={({isActive})=>(
          isActive
          ?("flex items-center px-4 py-2 text-gray-700 bg-gray-200 cursor-pointer")
          :("flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer")
        )}>
          <IoHelpCircleOutline className="mr-3 h-5 w-5" />
          Help
        </NavLink>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t">
        <div onClick={() => navigate('/logout')} className="flex items-center text-red-600 cursor-pointer">
          <BiExit className="mr-3 h-5 w-5" />
          Log out
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;