import React, { useState, useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import instance from '../../helper/axiosInstance';

const Map = ({ onLocationSelect }) => {
  const API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(76);
  const [lat, setLat] = useState(11);
  const [zoom, setZoom] = useState(14);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (map.current) return; // Prevent reinitialization of the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    // Fetch locations and add markers to the map
    const fetchLocations = async () => {
      try {
        const res = await instance.get('/location');
        const locationData = res?.data?.placeData || [];
        setPlaces(locationData);

        // Add markers after places are set
        if (locationData.length) {
          locationData.forEach((loc) => {
            new maplibregl.Marker({ color: '#FF0000' })
              .setLngLat([loc.lng, loc.lat])
              .addTo(map.current);
          });
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Handle map clicks to set markers for selected locations
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      onLocationSelect({ lng, lat });
      new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .addTo(map.current);
    });

    // Update coordinates and zoom on map move
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [onLocationSelect, API_KEY]);

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute w-full h-full" />
      <div className="absolute top-0 left-0 m-4 p-2 bg-white bg-opacity-80 rounded">
        <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
      </div>
    </div>
  );
};

export default Map;
