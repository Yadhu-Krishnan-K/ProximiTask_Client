import React, { useEffect, useState } from 'react';
import { User, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../helper/axiosInstance';
import { useSelector } from 'react-redux';
import Nav1 from '../../components/navbar/Nav1';
import ProfileCard from '../../components/user/WorkerProfile3';

const WorkCategoryComponent = () => {
  const nav = useNavigate()
  const user = useSelector((state) => state.userReducer.userData);
  const { cateName } = useParams();
  const [category, setCategory] = useState({});
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await instance.get(`/workers/${cateName}`);
        if (res.data.success) {
          setWorkers(res.data.workerList);
        }
        const res2 = await instance.get(`/category/${cateName}`);
        if(res2.data.success){
          setCategory(res2.data.category)
        }
        console.log(category,workers)
      } catch (error) {
        console.error('Error fetching workers:', error);
        setError('Failed to load workers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cateName]);
  
  async function selectedWorker(_id){
    console.log('Working.....');
    
    console.log('working id == ',_id)
    nav(`/user/WorkerDetails/${_id}/workerBooking`)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav1 user={user} />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-90" />
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative inline-block">
                {category?.croppedImgURL ? (
                  <img
                    src={category.croppedImgURL}
                    alt={cateName}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-xl">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {cateName}
            </h1>
            <p className="text-xl text-white opacity-90">
              Find skilled professionals in {cateName}
            </p>
          </div>
        </div>
      </div>

      {/* Workers Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No workers found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workers.map((worker) => (
              <ProfileCard
                key={worker._id}
                worker={worker}
                workerIdPass={selectedWorker}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCategoryComponent;