import axios from "axios";
import showErrorPopup from "../Common/ShowErrorPopup"; // Assume this function shows the error popup

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
    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        // Attach the token to the request headers
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      } 
      // else {
      //   // Handle the case where there's no token
      //   showErrorPopup("No access token found. Please log in.");
      //   window.location.href = "/UserLogin";
      // }

      return config;
    } catch (error) {
      
      // Handle errors that occur during token retrieval or config modification
      showErrorPopup("An error occurred while setting up the request.");
      return Promise.reject(error);
    }
  },
  (error) => {
    // Handle errors that occur before the request is sent
    showErrorPopup("Request setup failed. Please try again.");
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
    console.error('Error = ', error);
    const originalRequest = error.config;

    if (error.response) {
      const status = error.response.status;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const response = await axios.post("http://localhost:8000/refresh/access-token", {
              refreshToken: refreshToken,
            });

            if (response.data.success) {
              localStorage.setItem("accessToken", response.data.accessToken);
              originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
              return axios(originalRequest);
            } else {
              throw new Error('Refresh token expired');
            }
          } catch (refreshError) {
            console.error("Failed to refresh token", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/UserLogin"; 
          }
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/UserLogin"; // Redirect to login page
        }
      } else {
        const backendMessage = error.response.data.error || 'An error occurred';
        showErrorPopup(backendMessage);
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
