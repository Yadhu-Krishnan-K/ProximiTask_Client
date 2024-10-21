import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import instance from '../../helper/axiosInstance';
import Nav1 from '../../components/navbar/Nav1';
import { Briefcase, CarTaxiFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ServiceList() {
    const user = useSelector((state) => state.userReducer.userData);
    const [categories, setCategories] = useState([]);
    const nav = useNavigate()

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = () => {
        instance.get('/category')
            .then((res) => {
                setCategories(res.data.cateList);
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Nav1 user={user} />
            <div className="container mx-auto px-4 py-8">
                <h2 className='text-3xl font-bold text-center mb-8'>Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                    !categories.length?
                        <>
                        <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="h-48 overflow-hidden">
                            
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Briefcase className="text-gray-400" size={48} />
                                    </div>
                                
                            </div>
                            <div className="p-6">
                                
                            </div>
                        </div>
                        </>
                    :categories.map((category) => (
                        <div key={category._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" onClick={()=>nav(`/user/Services/${category.categoryName}`)}>
                            <div className="h-48 overflow-hidden">
                                {category.croppedImgURL ? (
                                    <img 
                                        src={category.croppedImgURL} 
                                        alt={category.categoryName} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Briefcase className="text-gray-400" size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{category.categoryName}</h3>
                                <p className="text-gray-600">{category.description || 'No description available'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServiceList;