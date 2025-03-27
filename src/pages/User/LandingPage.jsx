import React, { useEffect, useState } from "react";
import Nav1 from "../../components/navbar/Nav1";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUserData,deleteUserData } from "../../redux/features/User/userSlice";
import HeroSec from "../../components/user/HeroSec";
import WorkerNear from "../../components/user/WorkerNear";
import instance from "../../helper/axiosInstance";
import { useNavigate } from "react-router-dom";


function LandingPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.User.userData);

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
      <Nav1 user={user}/>
      <HeroSec />
      <WorkerNear location={location} />
      {/* <Categories /> */}
      <Footer />
    </>
  );
}

export default LandingPage;
