import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const LocationMapModal = ({ open, onClose, onSelectLocation, initialLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  // Replace with your Maptiler API key
  const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_API_KEY;
  
  useEffect(() => {
    if (!open || !mapContainer.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
      center: initialLocation ? [initialLocation.lng, initialLocation.lat] : [78.9629, 20.5937], // Default to India's center
      zoom: initialLocation ? 15 : 4
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add marker if initial location exists
    if (initialLocation) {
      marker.current = new maplibregl.Marker({ draggable: true })
        .setLngLat([initialLocation.lng, initialLocation.lat])
        .addTo(map.current);
    }

    // Handle map clicks
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      // Update or create marker
      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      } else {
        marker.current = new maplibregl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map.current);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [open, initialLocation]);

  if (!open) return null;

  const handleConfirm = () => {
    if (marker.current) {
      const { lng, lat } = marker.current.getLngLat();
      onSelectLocation({ lng, lat });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-11/12 max-w-4xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Select Location</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div ref={mapContainer} className="w-full h-[60vh]" />
        
        <div className="p-4 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationMapModal;