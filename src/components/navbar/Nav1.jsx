import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logOutHeloper from '../../helper/logoutHelper'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";


function Nav1({ user }) {
  const nav = useNavigate()
  const [ddopen, setDdopen] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // State to toggle the mobile menu

  function logout() {
    logOutHeloper('user')
    window.location.href = '/';
  }

  // Menu items as an array for easier reuse
  const menuItems = (
    <>
      <li className='cursor-pointer' onClick={() => nav('/')}>Home</li>
      <li className='cursor-pointer' onClick={() => nav('/services')}>Services</li>
      {user ? (
        <>
          <li className='cursor-pointer'>Chat</li>
          <li className='cursor-pointer flex justify-center items-center' onClick={() => setDdopen((prev) => !prev)}>{user.name}{ddopen ? (<IoMdArrowDropup />) : (<IoMdArrowDropdown />)}</li>
          {(
  <div
    className={`w-48 flex flex-col bg-white border border-gray-200 shadow-md rounded-md absolute top-16 right-0 z-50
    transition-all duration-300 ease-in-out transform overflow-hidden
    ${ddopen ? 'opacity-100 max-h-64 translate-y-0' : 'opacity-0 max-h-0 translate-y-[-10px]'}`}
    style={{ transitionProperty: 'opacity, transform, max-height' }}
  >
    <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav('/user/profile/editProfile')}>Edit Profile</div>
    <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav('/notifications')}>Notifications</div>
    <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav('/user/profile/security')}>Security</div>
    <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav('/help')}>Help</div>
    <div className='px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500' onClick={logout}>Logout</div>
  </div>
)}



        </>
      ) : (
        <>
          <li className='cursor-pointer' onClick={() => nav('/user/signUp')}>SignUp/SignIn</li>
          <li>
            <button
              className='bg-cyan-700 text-white py-1 px-4 rounded-full'
              onClick={() => nav('/worker/signUp')}
            >
              Become a tasker
            </button>
          </li>
        </>
      )}
    </>
  )

  return (
    <nav className='w-full h-20 flex justify-between items-center shadow-lg px-4'>
      {/* Logo Section */}
      <div className="logo flex items-center">
        <img src="/logo.png" alt="logo" className='lg:w-52 w-36 transition-all duration-300 ease-in-out' />
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center'>
        <ul className='flex space-x-4'>
          {menuItems}
        </ul>
      </div>

      {/* Burger Button for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 right-0 w-full bg-white shadow-lg md:hidden">
          <ul className='flex flex-col items-center space-y-4 p-4'>
            {menuItems}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Nav1
