import React from "react";
import Header from "../../components/worker/Header";
import IconBar from "../../components/worker/IconBar";
import ProfileForm from "../../components/worker/ProfileForm";
import ProfileSidebar from "../../components/worker/ProfileSidebar";
import WorkerHero from "../../components/worker/WorkerHero";
import { Outlet } from "react-router-dom";

function WorkerProfilie() {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header />
      <div className="w-full h-auto">
        <WorkerHero />
      </div>
      {/* <IconBar /> */}
      <div className="flex">
        <ProfileSidebar className="border-r-2" />
        {/* <ProfileForm /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default WorkerProfilie;
