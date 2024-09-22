import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setAdmin, adminLogout } from "../../redux/features/Admin/adminSlice";
import logOutHeloper from "../../helper/logoutHelper";

function Sidebar() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  function logout() {
    dispatch(adminLogout());
    localStorage.removeItem("adminLogedIn");
    logOutHeloper("admin");
    nav("/admin/login");
  }

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="mt-8 flex-grow">
        <NavLink
          to="/admin/panel/customers"
          className={({ isActive }) =>
            isActive ? "block py-2 px-4 bg-gray-900" : "block py-2 px-4"
          }
        >
          Customers
        </NavLink>
        <NavLink
          to="/admin/panel/workers"
          className={({ isActive }) =>
            isActive ? "block py-2 px-4 bg-gray-900" : "block py-2 px-4"
          }
        >
          Workers
        </NavLink>
        <NavLink
          to="/admin/panel/categories"
          className={({ isActive }) =>
            isActive ? "block py-2 px-4 bg-gray-900" : "block py-2 px-4"
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/admin/panel/location"
          className={({ isActive }) =>
            isActive ? "block py-2 px-4 bg-gray-900" : "block py-2 px-4"
          }
        >
          Location Management
        </NavLink>
      </nav>
      <div className="mt-auto p-4">
        <button
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
