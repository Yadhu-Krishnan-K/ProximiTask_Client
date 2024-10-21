import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { useParams } from 'react-router-dom';
import instance from '../../helper/axiosInstance';

// Sample data (replace with your actual data)
const categoryData = {
  name: "Web Development",
  image: "/api/placeholder/400/200",
  workers: [
    { id: 1, name: "Alice Johnson", role: "Front-end Developer" },
    { id: 2, name: "Bob Smith", role: "Back-end Developer" },
    { id: 3, name: "Charlie Brown", role: "Full-stack Developer" },
    { id: 4, name: "Diana Ross", role: "UI/UX Designer" },
  ]
};

const WorkCategoryComponent = () => {
    const cateName = useParams()
    const [category, setCategory] = useState({})
    const [workers, setWorkers] = useState([])
    async function getCategory(){
        let workers = await instance.get(`/workers/${cateName}`)
    }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src={categoryData.image} 
          alt={categoryData.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{categoryData.name}</h2>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Workers in this category:</h3>
        <ul className="space-y-4">
          {categoryData.workers.map((worker) => (
            <li key={worker.id} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
              <User className="text-gray-500" size={24} />
              <div>
                <p className="font-medium text-gray-800">{worker.name}</p>
                <p className="text-sm text-gray-600">{worker.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkCategoryComponent;