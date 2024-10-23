import React from 'react'
import { NavLink } from 'react-router-dom'

import { FaUserEdit } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdDashboard } from "react-icons/md";


function ProfileSidebar() {
  return (
    <>
        <div className='flex flex-col mt-8'>
            <NavLink to='/worker/profile/workerProfileEdit' className={({isActive})=>isActive?
            'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded flex justify-between items-center'
            :
            'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer flex  justify-between items-center'}>
                <FaUserEdit /> Edit Profile
            </NavLink>
            <NavLink 
                to='/WorkerProfile/billing'
                className={({isActive})=>isActive?
                'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded flex justify-between items-center'
                :
                'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer flex justify-between items-center'}
            >
              <FaCreditCard />  Billing
            </NavLink>
            <NavLink
                to='/worker/profile/notifications'
                className={({isActive})=>isActive?
                'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded flex justify-between items-center'
                :
                'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer flex justify-between items-center'}
            >
               <IoMdNotifications /> Notifications
            </NavLink>
            <NavLink
                to='/worker/profile/dash'
                className={({isActive})=>isActive?
                'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded flex justify-between items-center'
                :
                'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer flex justify-between items-center'}
            >
             <MdDashboard />   Dashboard
            </NavLink>
        </div>
    </>
  )
}

export default ProfileSidebar