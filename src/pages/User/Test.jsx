import React, { useEffect, useState } from 'react'
import instance from '../../helper/axiosInstance'

function Test() {
    const [val,setVal] = useState(null)
    useEffect(()=>{
        instance.get('/test')
        .then((res)=>{
            setVal('Hello')
        })
    },[])
  return (
    <div>Test {val}</div>
  )
}

export default Test