import React, { useEffect } from "react";
import ProfileSideBar from "../../components/user/ProfileSideBar";
import ProfileNavBar from "../../components/user/ProfileNavBar";
import {Outlet} from 'react-router-dom'

function Profile() {
  useEffect(() => {
    console.log("rendering profile");
  });
  return (
    <div className="flex">
      <ProfileSideBar />
      <div className="flex-1">
      <ProfileNavBar />
      <div className="px-10 py-10">

      </div>
      </div>
    {/* <Outlet /> */}
    </div>
  );
}

export default Profile;
