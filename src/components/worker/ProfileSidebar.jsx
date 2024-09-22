import React from 'react'
import { NavLink } from 'react-router-dom'

function ProfileSidebar() {
  return (
    <>
        <div className='flex flex-col mt-8'>
            <NavLink to='/WorkerProfile/workerProfileEdit' className={({isActive})=>isActive?
            'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded'
            :
            'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer'}>
                Edit Profile
            </NavLink>
            <NavLink 
                to='/WorkerProfile/billing'
                className={({isActive})=>isActive?
                'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded'
                :
                'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer'}
            >
                Billing
            </NavLink>
            <NavLink
                to='/WorkerProfile/notifications'
                className={({isActive})=>isActive?
                'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded'
                :
                'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer'}
            >
                Notifications
            </NavLink>
            <NavLink
                to='/WorkerProfile/Dashboard'
                className={({isActive})=>isActive?
                'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded'
                :
                'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer'}
            >
                Dashboard
            </NavLink>
        </div>
    </>
  )
}

export default ProfileSidebar