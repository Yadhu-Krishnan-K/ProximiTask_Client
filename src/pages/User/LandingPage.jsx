import React, { useEffect, useState } from "react";
import Nav1 from "../../components/navbar/Nav1";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/User/userSlice";

function LandingPage() {
  const dispatch = useDispatch()

  // const [location, setLocation] = useState(null)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data);
    if (data) {
      dispatch(setUserData(data));
    }

  }, []);
  const user = useSelector((state) => state.userReducer.userData);
  // const user = useSelector((state)=>)
  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition((res)=>{
  //     console.log(res.coords)
  //     setLocation({
  //       lat:res.coords.latitude,
  //       long:res.coords.longitude
  //     })
  //   })
  // },[])
  return (
    <>
      <Nav1 user={user}/>
      {/* <h1>latitude: {location.lat}</h1>
        <h1>longitude: {location.long}</h1> */}

      <Footer />
    </>
  );
}

export default LandingPage;
