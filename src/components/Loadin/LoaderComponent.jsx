import React from 'react';

function LoaderComponent() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* Large Circle Container */}
      <div className="relative h-48 w-48 rounded-full animate-spin">
        
        {/* Top Center Circles */}
        <div className="absolute top-0 left-20 w-10 h-10 bg-emerald-500 rounded-full" />
        <div className="absolute top-2 left-10 w-8 h-8 bg-emerald-400 rounded-full" />
        <div className="absolute top-8 left-4 w-6 h-6 bg-emerald-300 rounded-full" />
        <div className="absolute top-14 left-1 w-4 h-4 bg-emerald-200 rounded-full" />
      </div>

      {/* Centered Image (Not Rotating) */}
      <img 
        src="/FinalHeaderLogo.png" 
        alt="Loader" 
        className="absolute w-24 h-24 rounded-full object-fit z-10"
      />
    </div>
  );
}

export default LoaderComponent;