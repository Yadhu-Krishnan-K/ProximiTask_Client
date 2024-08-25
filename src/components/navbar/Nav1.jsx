import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logOutHeloper from '../../helper/logoutHelper'
// import {setUserData} from '../../features/User/userSlice'

function Nav1({user}) {
  const nav = useNavigate()
  function logout() {
    logOutHeloper('user')
    window.location.href = '/';
  }

  return (
    <nav className='w-full h-20 flex justify-between items-center shadow-lg px-4'>
      <div className="logo flex items-center">
        <img src="/logo.png" alt="" className='w-52' />
      </div>
      <div className='flex items-center'>
        <ul className='flex space-x-4'>
          <li className='cursor-pointer' onClick={() => nav('/')}>Home</li>
          <li className='cursor-pointer' onClick={() => nav('/services')}>Services</li>
          {user ? (
            <>
              <li className='cursor-pointer'>Chat</li>
              <li className='cursor-pointer' onClick={logout}>{user.name}</li>
            </>
          ) : (
            <>
              <li className='cursor-pointer' onClick={() => nav('/UserSignUp')}>SignUp/SignIn</li>
              <li>
                <button 
                  className='bg-cyan-700 text-white py-1 px-4 rounded-full' 
                  onClick={() => nav('/WorkerSignUp')}
                >
                  Become a tasker
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Nav1
