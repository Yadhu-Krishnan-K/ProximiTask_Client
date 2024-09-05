import React, { useEffect, useState } from "react";
import ProfileSideBar from "../../components/user/ProfileSideBar";
import ProfileNavBar from "../../components/user/ProfileNavBar";
import { Outlet } from 'react-router-dom'
import EditProfile from "../../components/user/EditProfile";

function Profile() {
  useEffect(() => {
    console.log("rendering profile");
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfileNavBar toggleSidebar={toggleSidebar} />
      <ProfileSideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="lg:ml-64 pt-16 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
