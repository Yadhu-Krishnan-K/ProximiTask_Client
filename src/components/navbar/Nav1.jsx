import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {setUserData} from '../../features/User/userSlice'

function Nav1({user}) {
  const nav = useNavigate()
  // const data = JSON.parse(localStorage.getItem('userData'))
  // console.log(data)
  // if(data){
    // dispatch(setUserData(data))
  // }
  // const user = useSelector((state) => state.userReducer.userData)   
  // console.log(user)

  return (
    <nav className='w-full h-20 flex justify-between items-center shadow-lg px-4'>
      <div className="logo flex items-center">
        <img src="/logo.png" alt="" className='w-52' />
      </div>
      <div className='flex items-center'>
        <ul className='flex space-x-4'>
          <li className='cursor-pointer' onClick={() => nav('/')}>Home</li>
          <li className='curLogosor-pointer' onClick={() => nav('/services')}>Services</li>
          {user ? (
            <>
              <li className='cursor-pointer'>Chat</li>
              <li>{user.name}</li>
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
