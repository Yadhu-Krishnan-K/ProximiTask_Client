function isWithin20km(lat1, lon1, lat2, lon2) {
  try {
    const R = 6371; // Earth's radius in kilometers

    // Convert degrees to radians
    lat1 = Number(lat1)
    lat2 = Number(lat2)
    lon1 = Number(lon1)
    lon2 = Number(lon2)
    console.log('lat1==',lat1,', lon1=',lon1,', lat2=',lat2,', lon2=',lon2)

    const radLat1 = toRadians(lat1);
  const radLon1 = toRadians(lon1);
  const radLat2 = toRadians(lat2);
  const radLon2 = toRadians(lon2);
  
  // Calculate differences
  const deltaLat = radLat2 - radLat1;
  const deltaLon = radLon2 - radLon1;
  
  // Haversine formula
  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(radLat1) * Math.cos(radLat2) * 
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    // Distance in kilometers
    const distance = R * c;
    console.log('Calculated Distance =', distance);

    // Ensure correct comparison
    return distance <= 20;
  } catch (error) {
    console.log('Error in isWithin20km =', error);
    return false;
  }
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export default isWithin20km;
