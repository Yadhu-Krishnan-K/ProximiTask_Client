import React from 'react'

function HeroSec() {
  return (
    <div className='w-full min-h-screen flex flex-col md:flex-row items-center justify-between relative'>
      <div className='w-full md:w-1/2 z-10'>
        <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-8 text-right'>
          FIND PROFESSIONALS NEAR YOU
        </h1>
        <div className='max-w-md mx-auto mt-6'>
          <div className='flex'>
            <input 
              type="text" 
              placeholder="What do you need help with?" 
              className='flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button className='bg-teal-500 text-white p-2 rounded-r-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 absolute md:relative right-0 bottom-0'>
        <div className='bg rounded-full w-3/4 h-3/4 absolute bottom-0 right-0 z-0'></div>
        <img 
          src="/Rectangle 2.png" 
          className='w-full h-auto max-w-lg mx-auto md:max-w-full relative z-10' 
          alt="Professionals near you" 
        />
      </div>
    </div>
  )
}

export default HeroSec