import React from 'react'

function ProfileNavBar() {
  return (
    <div className='flex-1 bg-stone-500'>
      <ul className='flex justify-end space-x-4 p-2'>
        <li className='cursor-pointer'>Home</li>
        <li className='cursor-pointer'>Service</li>
        <li className='cursor-pointer'>Chat</li>
        <li className='cursor-pointer'>User</li>
      </ul>
    </div>
  )
}

export default ProfileNavBar