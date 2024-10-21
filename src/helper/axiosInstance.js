import axios from "axios";
import showErrorPopup from "../Common/ShowErrorPopup"; // Assume this function shows the error popup
import {jwtDecode} from 'jwt-decode'

// Create an Axios instance
const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // console.log('instance.interceptors',instance.interceptors);
    
    // console.log('config from interceptor = ',config)
    try {
      const accessTokens = localStorage.getItem("accessTokens");
      // console.log(`accessToken = ${localStorage.getItem("accessTokens")}, refreshToken = ${localStorage.getItem("refreshToken")}`);
      
      // const refreshToken = localStorage.getItem("refreshToken")

      if (accessTokens && accessTokens.length) {
        // Attach the token to the request headers
        config.headers["Access-Tokens"] = accessTokens
        // config.headers["Refresh-Tokens"] = refreshTokens
      } 

      return config;
    } catch (error) {
      
      // Handle errors that occur during token retrieval or config modification
      console.log('An error occurred while setting up the request. ',error)
      showErrorPopup("Something went wrong please try again later");
      return Promise.reject(error);
    }
  },
  (error) => {
    // Handle errors that occur before the request is sent
    console.log('Request setup failed. Please try again.',error)
    showErrorPopup("Something went wrong please try again later");
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Response from instance = ', response);
    return response;
  },
  async(error) => {
    console.error('axios Error response = ', error);
    const originalRequest = error.config;
    console.log('response from error = ',error.response)
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data
      // console.log('data ==== from  ==== error ====----===-',data)
      
      let pos
      let accessTokens = localStorage.getItem("accessTokens")
      let details = {}
      if(accessTokens){
        let accTs = JSON.parse(accessTokens)
        for(let i=0;i<accTs.length;i++){
          const decoded = jwtDecode(accTs[i])
          if(decoded.role == data.role){
            details.role = decoded.role
            details.email = decoded.email
            pos = i
            break;
          }
          
        }
        console.log('details obj ===============!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',details)
        if(pos<accTs.length){
          accTs.splice(pos,1)
          localStorage.setItem('accessTokens',JSON.stringify(accTs))
        }
      }

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        console.log('refresh ================================---- ===',refreshToken)
        if (refreshToken) {
          try {
            const response = await axios.post("http://localhost:8000/refresh/access-token", {
              refreshToken: refreshToken,
              details
            });

            if (response.data.success) {
              let accessTokens  = JSON.parse(localStorage.getItem("accessTokens"))
              accessTokens.push(response.data.accessToken)
              localStorage.setItem("accessTokens", JSON.stringify(accessTokens));
              originalRequest.headers["Access-Tokens"] = JSON.stringify(accessTokens);
              return axios(originalRequest);
            } else {
              throw new Error('Refresh token expired');
            }
          } catch (refreshError) {
            console.error("Failed to refresh token", refreshError);
            localStorage.clear()
            if(data.role == 'user') window.location.href = "/user/login"; 
            if(data.role == 'admin') window.location.href = "/admin/login"; 
            if(data.role == 'worker') window.location.href = '/worker/signup';
          }
        } else {
            localStorage.clear()
            if(data.role == 'user') window.location.href = "/user/login"; 
            if(data.role == 'admin') window.location.href = "/admin/login"; 
            if(data.role == 'worker') window.location.href = '/worker/signup';
        }
      }else if(status == 500){
        showErrorPopup("Something went wrong, please try again later")
      }else{
        
      }
    } else if (error.request) {
      // The request was made but no response was received (network error, server down)
      showErrorPopup('Network error or server is down. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      showErrorPopup('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default instance;