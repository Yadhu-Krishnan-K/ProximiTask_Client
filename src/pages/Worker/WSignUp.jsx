
import React from 'react';

const WSignUp = () => {
  return (
    <div className="flex w-full h-screen">
      
      <div className="hidden md:flex md:w-1/2 bg-cover" style={{backgroundImage: "url('../../../public/Polygon 1.png')"}}>
        <div className=" w-full h-full flex p-8">
          <div>
            <h2 className="text-white text-3xl font-bold mb-2">PROXIMITASK</h2>
            {/* <p className="text-white text-exl">DOLOR</p> */}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Create Account</h1>
          <form>
            <div className="mb-4">
              <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Email Address" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <div className="mb-6">
              <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300">Create Account</button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account? <a href="#" className="text-purple-600 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WSignUp;