import React from 'react';

const WorkerInfo = () => {
  return (
    <div className="w-full md:h-52 h-20 border-b-2">
      <div
        className="h-2/3 bg-orange-700 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/Rectangle 2.png')" }}
      ></div>

      <div className="relative w-full h-1/3 ps-2">
        <img
          src="vite.svg"
          alt="User"
          className="rounded-full h-20 w-20 object-cover shadow-md absolute -mt-10 bg-slate-400"
        />

        <div className=" ml-20">
          <h6 className="font-semibold text-gray-900">Amit Abraham</h6>
          <span className="text-gray-900 text-sm">Work</span>
        </div>
      </div>
    </div>
  );
};

export default WorkerInfo;
