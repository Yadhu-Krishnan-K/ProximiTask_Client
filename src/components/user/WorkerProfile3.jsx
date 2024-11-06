import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../helper/axiosInstance';

export default function ProfileCard({ worker, workerIdPass }) {
  // const {id} = useParams();
  // const [worker, setWorker] = useState(null)
  // useEffect(()=>{
  //   getWorker(id)
  // },[])
  async function getWorker(_id){
    // const response =await instance.get(`/workers/worker/${_id}`)
    console.log(response)
  }
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={()=>workerIdPass(worker._id)}>
      {/* Card Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={worker.croppedImgURL}
          alt={`${worker.name}'s profile`}
          className="w-full h-full object-cover hover:scale-110 transition duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h4 className="text-xl font-bold text-white mb-1">
            {worker.name}
          </h4>
          <p className="text-sm text-gray-200">{worker?.category_id?.categoryName}</p>
        </div>
      </div>
      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="text-sm text-gray-600">{worker.rating || '4.5'} ({worker.reviewCount || '10'} reviews)</span>
        </div>
        <div className="mb-3 flex items-center text-gray-700">
          <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
            <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          </svg>
          <span className="text-sm">{worker.location_id.name || 'City, Country'}</span>
        </div>
        <div className="mb-4 flex items-center text-gray-700">
          <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
            <path d="M17.924 2.617a.997.997 0 0 0-.215-.322l-.004-.004A.997.997 0 0 0 17 2h-4a1 1 0 1 0 0 2h1.586l-3.293 3.293a1 1 0 1 0 1.414 1.414L16 5.414V7a1 1 0 0 0 2 0V3a.997.997 0 0 0-.076-.383zM2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          <span className="text-sm">{worker.phoneNumber || '+1 234 567 8900'}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium">
          Contact
        </button>
      </div>
    </div>
  );
}