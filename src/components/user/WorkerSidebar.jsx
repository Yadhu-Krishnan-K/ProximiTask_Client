import React from 'react'
import { NavLink } from 'react-router-dom'

function WorkerSidebar({id}) {
  return (
    <div className='grid mt-5 p-3 max-w-44 border-2'>
        {/* <NavLink 
         to='/user/WorkerDetails/WorkerServices'
         className={({isActive})=>
            isActive?
            'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded'
            :
            'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer'
         }
        >
            Services
        </NavLink> */}
        <NavLink 
         to={`/user/WorkerDetails/${id}/details`}
         className={({isActive})=>
            isActive?
            'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded'
            :
            'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer'
         }
        >
            Details
        </NavLink>
        <NavLink 
        to={`/user/WorkerDetails/${id}/workerBooking`}
        className={({isActive})=>
            isActive?
            'text-[#083A50] cursor-pointer bg-gray-300 font-semibold py-2 px-4 w-full rounded'
            :
            'text-gray-400 font-semibold py-2 px-4 w-full rounded hover:bg-gray-200 hover:text-[#083A50] cursor-pointer'
         }       
        >
            Book Now
        </NavLink>
    </div>
  )
}

export default WorkerSidebar