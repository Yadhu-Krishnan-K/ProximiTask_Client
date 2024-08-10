import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // Modify request config if needed

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log('response from instance = ',response)
    
    return response
  },
  async (error) => {
    console.log('err  =  ',error)
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          console.log('----------------------===========================================================111111111111111111111111111!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####################$$$$$$$$$$$$$$$4');
          const response = await axios.post("http://localhost:8000/refresh/access-token", {
            refreshToken: refreshToken,
          });

          if(response.data.success){
            console.log('success---===+++---==')
            localStorage.setItem("accessToken", response.data.accessToken);
            originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
            return axios(originalRequest);
          }else{
            throw new Error('Refresh token Expired')
          }
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
          // Handle refresh token failure, e.g., logout user
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/UserLogin"; // Redirect to login page
        }
      } else {
        // Handle case when there is no refresh token
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/UserLogin"; // Redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
