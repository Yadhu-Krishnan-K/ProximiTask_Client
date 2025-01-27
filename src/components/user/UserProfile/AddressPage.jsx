import React, { useState } from 'react';
import { FaMapMarkerAlt, FaMapMarkedAlt } from "react-icons/fa";

const AddressPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loc, setLoc] = useState({
    latitude:null,
    longitudea:null
  })

  const addresses = [
    {
      id: 1,
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      latitude: 37.7749,
      longitude: -122.4194
    },
    {
      id: 2,
      street: '456 Oak Rd',
      city: 'Somewhere',
      state: 'NY',
      zip: '67890',
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      id: 3,
      street: '789 Pine Ave',
      city: 'Elsewhere',
      state: 'TX',
      zip: '54321',
      latitude: 29.7604,
      longitude: -95.3698
    }
  ];
  const getCurrentLocation = () => {
    // const currentPos = new GeolocationCoordinates()
    // console.log(currentPos)
    navigator.geolocation.getCurrentPosition(async(pos)=>{
      console.log('pos = ',pos)
      setLoc({latitude:pos.coords.latitude,longitude:pos.coords.longitude})
      console.log(loc)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
      );
      const placeData = await response.json()
      console.log('pd = ',placeData)
    },(error)=>{
      console.log(error)
    })
    

  }

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="min-h-screen" >
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Left sidebar */}
          <div className="w-96 bg-white shadow-lg rounded-lg p-6 mt-8">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors" onClick={getCurrentLocation}>
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Current Location</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors">
                  <FaMapMarkedAlt className="mr-2" />
                  <span>Select from Map</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleAddressClick(address)}
                  >
                    <h3 className="font-medium text-gray-900">{address.street}</h3>
                    <p className="text-gray-600 text-sm">
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area - can be used for map or other content */}
          <div className="flex-1">
            {/* Content goes here */}
          </div>
        </div>
      </div>

      {/* Selected address popup */}
      {selectedAddress && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-10 border border-gray-200">
          <h3 className="font-medium text-gray-900">{selectedAddress.street}</h3>
          <p className="text-gray-600 text-sm">
            {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}
          </p>
          <p className="text-gray-600 text-sm">Latitude: {selectedAddress.latitude}</p>
          <p className="text-gray-600 text-sm">Longitude: {selectedAddress.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default AddressPage;