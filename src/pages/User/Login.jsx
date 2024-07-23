import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import instance from '../../helper/axiosInstance';
import { setUserData } from "../../features/User/userSlice";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const nav = useNavigate();

  function submit() {
    instance.post('/users/login', {
      email,
      pass
    })
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        
        localStorage.setItem('userData',JSON.stringify(res.data.user))
        dispatch(setUserData(res.data.user));
        nav('/');
      }
    });
  }

  return (
    <div className="w-full h-screen bg-emerald-200 flex justify-center items-center">
      <div className="w-1/3 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
        <div className="mb-4">
          <input 
            type="email" 
            className="w-full p-2 border border-gray-300 rounded" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button 
          className="w-full p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          onClick={submit}
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? 
          <span 
            className="text-sky-400 underline cursor-pointer ml-1" 
            onClick={() => nav('/UserSignUp')}
          >
            Sign Up
          </span>
        </p>
        <p className="text-center mt-2">or</p>
        <button className="w-full bg-white text-gray-700 py-3 rounded-md mt-2 border border-gray-300 hover:bg-gray-100 transition duration-300">
          Sign up with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
