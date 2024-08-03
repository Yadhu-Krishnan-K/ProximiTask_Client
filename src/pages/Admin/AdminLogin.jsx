import React, { useState } from 'react';
import instance from '../../helper/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post('/admin/login',{
      email,password
    })
    .then((res)=>{
      if(res.data.success){
        nav('/AdminPanel')
      }
    })
  };

  return (
    <div className="bg-emerald-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-emerald-400 text-2xl font-bold mb-6">ProximiTask</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500 transition duration-300"
          >
            LOGIN
          </button>
        </form>
        <a href="#" className="block text-center mt-4 text-emerald-400 hover:underline">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;