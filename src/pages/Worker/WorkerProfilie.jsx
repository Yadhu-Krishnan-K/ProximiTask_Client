import React from "react";
import Header from "../../components/worker/Header";
import IconBar from "../../components/worker/IconBar";
import ProfileForm from "../../components/worker/ProfileForm";

function WorkerProfilie() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <IconBar />
      <ProfileForm />
    </div>
  );
}

export default WorkerProfilie;
