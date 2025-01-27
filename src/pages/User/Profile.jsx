import React, { useEffect, useState } from "react";
import ProfileSideBar from "../../components/user/ProfileSideBar";
import ProfileNavBar from "../../components/user/ProfileNavBar";
import { Outlet } from 'react-router-dom'
import EditProfile from "../../components/user/EditProfile";
import { useSelector } from "react-redux";

function Profile({user}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfileNavBar toggleSidebar={toggleSidebar} user={user}/>
      <ProfileSideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} user={user} />
      <div className={`transition-all duration-300 pt-16 p-4 sm:p-6 lg:p-8 ${
        sidebarOpen ? 'lg:ml-64' : 'ml-0'
      }`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;