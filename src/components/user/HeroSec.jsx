import React, { useEffect, useState } from 'react'
import instance from '../../helper/axiosInstance'
function HeroSec() {

 const [text, setText] = useState('')
 const [loading, setLoading] = useState(false)
 const [data, setData] = useState([])
 
 useEffect(()=>{
  let timerId = setTimeout(async()=>{
      let response = await instance.get(`/url/${text}`)
  },500)

  return ()=>clearTimeout(timerId)
},[text])
 
 function handleChange(e){
  setText(e.target.value)
 }

  return (
    <div className='w-full min-h-screen flex'>
      <div className='absolute inset-0 z-10 flex flex-col gap-40 md:gap-0 justify-center w-full p-4 sm:relative sm:z-auto text-wrap'>
        <h1 className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-green-500 mb-8 md:text-right'>
          FIND PROFESSIONALS <span className='text-sky-500'>NEAR YOU</span>
        </h1>
          <div className='flex justify-center'>
            <input 
              type="text" 
              placeholder="What do you need help with?" 
              className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleChange}
            />
          </div>

      </div>
      <div className='w-full right-0 bottom-0 mt-1 relative'>
        <img 
          src="/Rectangle 2.png" 
          className='w-full h-full' 
          alt="Professionals near you" 
        />
      </div>
    </div>
  )
}

export default HeroSec

