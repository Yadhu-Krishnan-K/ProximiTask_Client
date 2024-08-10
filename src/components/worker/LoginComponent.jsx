import React from "react";

function LoginComponent({ onClose }) {
  return (
    <div className="p-5 flex flex-col">
      <button onClick={onClose} className="self-end text-2xl">&times;</button>
      <h3 className="md:text-2xl lg:text-3xl mb-4">Log In</h3>
      <input type="email" placeholder="Email Address" className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
      <input type="password" placeholder="Password" className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
      <button className="bg-[#3F7AEE] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Log in</button>
    </div>
  );
}

export default LoginComponent;