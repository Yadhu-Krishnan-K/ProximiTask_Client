import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import instance from '../../helper/axiosInstance'

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [conPass, setConPass] = useState('')
  const nav = useNavigate()

  function submit() {
    if (pass === conPass) {
      instance.post('/users/signup', {
        name,
        email,
        pass
      })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          nav('/UserLogin')
        }
      })
    }
  }

  return (
    <div className="w-full h-screen bg-emerald-200 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#F6FBF9] rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create An Account</h1>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Confirm Password"
            onChange={(e) => setConPass(e.target.value)}
          />
        </div>
        <button 
          className="w-full bg-[#84C7AE] text-white py-3 rounded-md mt-6 hover:bg-emerald-600 transition duration-300"
          onClick={submit}
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account? {" "}
          <span className="text-sky-400 underline cursor-pointer" onClick={() => nav('/UserLogin')}>
            Sign In
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

export default SignUp;