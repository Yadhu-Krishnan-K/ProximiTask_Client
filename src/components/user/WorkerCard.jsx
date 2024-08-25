import React from 'react';

const WorkerCard = ({ worker }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* <img
        src={worker.picture}
        alt={`${worker.name}'s profile`}
        className="w-full h-48 object-cover"
      /> */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900"></h2>
        {/* <p className="text-gray-600">{worker.workName}</p> */}
      </div>
    </div>
  );
};

export default WorkerCard;
