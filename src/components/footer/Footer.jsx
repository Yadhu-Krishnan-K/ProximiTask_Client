import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">ProximiTask</h2>
          <div className="flex flex-col md:flex-row items-center">
            <p className="mb-2 md:mb-0 md:mr-6">
              <i className="fas fa-map-marker-alt mr-2"></i>
              245 Fairmount Drive, Suite 4 • Charlottesville, CA 22545
            </p>
            <p className="mb-2 md:mb-0 md:mr-6">
              <i className="fas fa-phone mr-2"></i>
              (123) 456-7890
            </p>
            <p>
              <i className="fas fa-fax mr-2"></i>
              (123) 456-7890
            </p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-youtube"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-pinterest"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-reddit"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fas fa-rss"></i></a>
        </div>
        
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:underline">ABOUT US</a>
          <a href="#" className="hover:underline">CONTACT US</a>
          <a href="#" className="hover:underline">HELP</a>
          <a href="#" className="hover:underline">PRIVACY POLICY</a>
          <a href="#" className="hover:underline">DISCLAIMER</a>
        </div>
        
        <div className="text-center text-sm mt-6">
          Copyright © 2024 • Lit Media Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;