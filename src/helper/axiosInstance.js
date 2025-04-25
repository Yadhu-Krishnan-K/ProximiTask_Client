import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  // timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


export default instance;
