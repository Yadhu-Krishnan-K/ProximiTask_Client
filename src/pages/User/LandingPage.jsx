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

  const [location, setLocation] = useState(null)
  useEffect(() => {
    console.log('instance rerender working..........===============----------')
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log('data from Landing page ======',data)
    if (data) {
      instance.get(`/users/${data.email}`)
      .then((res) => {
          console.log('response from Landing page ====',res)
          let result = res.data.user.isActive
          if (!result) {
            // If user is inactive, log them out            
            localStorage.removeItem("userData");
            dispatch(deleteUserData())
            navigate("/UserLogin"); // Redirect to login page
          } else {
            // If user is active, set the user data in Redux
            dispatch(setUserData(data));
          }
        })
        .catch((error) => {
          console.error("Error fetching user status:", error);
        });
    }
  }, []);

  const user = useSelector((state) => state.userReducer.userData);
  
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
