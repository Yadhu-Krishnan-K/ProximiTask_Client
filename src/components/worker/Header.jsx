import React from 'react';

const Header = () => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="flex items-center">
      <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
      <nav>
        <ul className="flex space-x-4">
          <li>PEOPLE</li>
          <li>SERVICES</li>
          <li>CHAT</li>
        </ul>
      </nav>
    </div>
    <div className="flex items-center">
      <span className="mr-2">Amit</span>
      <img src="profile-pic.jpg" alt="Profile" className="h-10 w-10 rounded-full" />
    </div>
  </header>
);

export default Header;