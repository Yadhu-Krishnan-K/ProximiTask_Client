import axios from "axios";
import showErrorPopup from "../Common/ShowErrorPopup"; // Assume this function shows the error popup
import {jwtDecode} from 'jwt-decode'
import { setAccessToken, setRoles, logout } from '../redux/features/authSlice'
import {store} from "../redux/app/store";

// Create an Axios instance
const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

instance.interceptors.request.use(
  (config) => {
      const state = store.getState();
      console.log('state = ',state)
      const token = state.auth.accessToken;

      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
              const res = await axios.get('/auth/refresh', { withCredentials: true });
              store.dispatch(setAccessToken(res.data.accessToken));

              instance.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
              originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

              return instance(originalRequest);
          } catch (err) {
              store.dispatch(logout());
          }
      }
      return Promise.reject(error);
  }
);

export default instance;