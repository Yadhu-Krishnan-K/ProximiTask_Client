import React, { useState, useRef, useEffect } from 'react';
import Map from './MapLocation';
import instance from '../../helper/axiosInstance';

const LocationManagementPage = () => {
  const API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ name: '', address: '', lat: null, lng: null });
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  useEffect(()=>{
    getLocations()
  },[])

  const handleLocationSelect = async ({ lng, lat }) => {
    try {
      const response = await fetch(`https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${API_KEY}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        setNewLocation(prev => ({ ...prev, address, lat, lng }));
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const addLocation = () => {
    try {
      if (newLocation.name && newLocation.address && newLocation.lat && newLocation.lng) {
        //update backend
        instance.post('/location',newLocation)
        .then((res)=>{
          if(res.data.success){
            getLocations()
          }
        })
        // setLocations([...locations, { id: locations.length + 1, ...newLocation }]);
        setNewLocation({ name: '', address: '', lat: null, lng: null });
        setIsAddingLocation(false);
      }
      
    } catch (error) {
      
    }
  };

  const getLocations =async()=>{
    try {
      console.log('reached getLocations-----------------------------======\\\\//////////////')
      const response = await instance.get('/location')
      const data = response.data
      console.log('location data = ',data)
      setLocations([...data.placeData]);
      setNewLocation({ name: '', address: '', lat: null, lng: null });
      setIsAddingLocation(false);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLocation = async(id) => {
    try {
      console.log('deleting ...')
      await instance.delete(`/location/${id}`)
      .then((res)=>{
        if(res.success){
          getLocations() 
        }
      })
    } catch (error) {
      console.log(error)
    }
  };

  return (
<div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Location Management</h1>
  
  {!isAddingLocation ? (
    <button 
      onClick={() => setIsAddingLocation(true)} 
      className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    >
      Add New Location
    </button>
  ) : (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Location Name"
        value={newLocation.name}
        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Address"
        value={newLocation.address}
        onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <Map onLocationSelect={handleLocationSelect} />
      <div className="flex justify-end mt-2">
        <button 
          onClick={addLocation} 
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Confirm Selection
        </button>
        <button 
          onClick={() => setIsAddingLocation(false)} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )}

  <div className="overflow-x-auto">
    <table className="min-w-full table-fixed bg-white shadow-md rounded overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
          <th className="w-1/3 px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
          <th className="w-1/3 px-6 py-3 text-left text-sm font-medium text-gray-700">Coordinates</th>
          <th className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <tr key={location._id} className="border-t">
            <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{location.name}</td>
            <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{location.address}</td>
            <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{`${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded" 
                onClick={() => deleteLocation(location._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default LocationManagementPage;