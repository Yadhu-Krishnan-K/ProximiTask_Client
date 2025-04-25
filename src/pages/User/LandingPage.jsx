import React, { useEffect, useState } from "react";
import Nav1 from "../../components/navbar/Nav1";
import Footer from "../../components/footer/Footer";
import HeroSec from "../../components/user/HeroSec";
import WorkerNear from "../../components/user/WorkerNear";



function LandingPage() {
  

  const [location, setLocation] = useState(null)
  useEffect(() => {}, []);

  
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
      <Nav1/>
      <HeroSec />
      <WorkerNear location={location} />
      {/* <Categories /> */}
      <Footer />
    </>
  );
}

export default LandingPage;
