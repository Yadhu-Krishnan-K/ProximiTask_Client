import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:8000',
    timeout:10000,
    headers:{
        'Content-Type':'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        // Modify request config if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
)

instance.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx causes this function to trigger
        return response;
      },
      (error) => {
        // Any status codes outside the range of 2xx cause this function to trigger
        return Promise.reject(error);
      }
)

export default instance