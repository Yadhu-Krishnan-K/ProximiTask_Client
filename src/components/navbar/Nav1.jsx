import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logOutHelper from '../../helper/logoutHelper'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function Nav1({ user }) {
  const nav = useNavigate()
  const [ddopen, setDdopen] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // State to toggle the mobile menu
  const dropdownRef = useRef(null)
  useEffect(()=>{
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDdopen(false); // Close the dropdown if clicked outside
      }
    }

    // Add event listener for clicks on the whole document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  function logout() {
    localStorage.removeItem('userData')
    logOutHelper('user')
    window.location.href = '/';
  }

  // Menu items as an array for easier reuse
  const menuItems = (
    <>
      <li className='cursor-pointer' onClick={() => nav('/')}>Home</li>
      <li className='cursor-pointer' onClick={() => nav('/user/Services')}>Services</li>
      {user ? (
        <>
          <li className='cursor-pointer'>Chat</li>
          <li className='relative' ref={dropdownRef}>
              <div className='flex items-center cursor-pointer space-x-2 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300' onClick={() => setDdopen(!ddopen)}>
              <img src={user.croppedImgURL} alt="img" className='w-8 h-8 rounded-full object-cover border-2 border-cyan-500' />
              <span className='text-md font-semibold text-gray-800'>{user.name}</span>
              <span className='text-cyan-500'>
                {ddopen ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
              </span>
            </div>

            {/* Dropdown Menu */}
            {ddopen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50'>
                <div className='flex flex-col'>
                  <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav(`/user/profile/${user._id}/editProfile`)}>Edit Profile</div>
                  <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav(`/user/profile/${user._id}/notifications`)}>Notifications</div>
                  <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav(`/user/profile/${user._id}/security`)}>Security</div>
                  <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => nav(`/user/profile/${user._id}/help`)}>Help</div>
                  <div className='px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500' onClick={logout}>Logout</div>
                </div>
              </div>
            )}
          </li>
        </>
      ) : (
        <>
          <li className='cursor-pointer' onClick={() => nav('/user/signUp')}>SignUp/SignIn</li>
          <li>
            <button
              className='bg-cyan-700 text-white py-1 px-4 rounded-full hover:bg-cyan-800 transition-colors duration-300'
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
    <nav className='w-full h-16 flex justify-between items-center shadow-md px-4 bg-white'>
      {/* Logo Section */}
      <div className="logo flex items-center">
        <img src="/logo.png" alt="logo" className='lg:w-48 w-36 transition-all duration-300 ease-in-out' />
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center'>
        <ul className='flex space-x-6 text-md font-medium text-gray-700 items-center'>
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
        <div className="absolute top-16 right-0 w-full bg-white shadow-lg md:hidden z-40">
          <ul className='flex flex-col items-center space-y-4 p-4 text-md font-medium text-gray-700'>
            {menuItems}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Nav1
