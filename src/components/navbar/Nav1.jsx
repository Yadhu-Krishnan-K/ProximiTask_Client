import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logOutHeloper from '../../helper/logoutHelper'

function Nav1({ user }) {
  const nav = useNavigate()
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
          <li className='cursor-pointer' onClick={logout}>{user.name}</li>
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
