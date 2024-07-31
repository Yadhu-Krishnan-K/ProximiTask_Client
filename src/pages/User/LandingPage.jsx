import React, { useEffect, useState } from 'react'
import Nav1 from '../../components/navbar/Nav1'
import Footer from '../../components/footer/Footer'

function LandingPage() {
  const [location, setLocation] = useState(null)
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((res)=>{
      console.log(res.coords)
      setLocation({
        lat:res.coords.latitude,
        long:res.coords.longitude
      })
    })
  },[])
  return (
    <>
        <Nav1 />
        {/* <h1>latitude: {location.lat}</h1>
        <h1>longitude: {location.long}</h1> */}

        <Footer />
    </>
  )
}

export default LandingPage