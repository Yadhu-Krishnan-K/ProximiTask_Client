import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/SideBar";

function Container() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto transition-all">
        <Outlet />
      </div>
    </div>
  );
}

export default Container;
