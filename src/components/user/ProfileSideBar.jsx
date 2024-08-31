import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { ImPencil } from "react-icons/im";
import { FaRegBell } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import { BiExit } from "react-icons/bi";


function ProfileSideBar() {
  const nav = useNavigate()

  useEffect(() => {
    console.log("rendering sidebar");
  });

  function toHome(){
    nav('/')
  }
  
  return (
    <div className="md:max-w-52 h-screen p-2 border-r-2 border-black fixed z-10">
      <div className="text-xl font-bold flex items-center cursor-pointer" onClick={toHome}>
        <div className="h-5 w-5">
          <IoIosArrowBack />
        </div>
        <span>Settings</span>
      </div>

      <div className="imgSec mt-4 h-20 w-20"></div>

      <div className="navSec mt-4">
        <ul className="">
          <li className="flex items-center mb-4">
            <ImPencil className="mr-2"/>
            Edit Profile
          </li>
          <li className="flex items-center mb-4">
            <FaRegBell className="mr-2" />
            Notifications
          </li>
          <li className="flex items-center mb-4">
            <MdLockOutline className="mr-2" />
            Security
          </li>
          <li className="flex items-center mb-4">
            <IoHelpCircleOutline className="mr-2" />
            Help
          </li>
        </ul>

      </div>
      <div className="h-72 grid content-end">
        <div className="flex justify-center items-center">
          <BiExit className="color-[#D85B53] mr-2" />
          <p>Log Out</p>
        </div>
      </div>

    </div>
  );
}

export default ProfileSideBar;
