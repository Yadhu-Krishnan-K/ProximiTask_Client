import React from 'react';

const WorkerCard = ({ worker }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{worker.name}</h2>
        <h3 className="text-lg mt-2 text-gray-600">{worker.category}</h3>
        <p className="mt-2 text-gray-600">{worker.area}</p>
        {/* <p className="mt-2 text-gray-600">Distance: {worker.distance} km</p> */}
        {/* Add more worker details as needed */}
      </div>
    </div>
  );
};

export default WorkerCard;