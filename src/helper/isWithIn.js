function isWithin20km(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const distance = R * c;
    
    return distance <= 20;
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  // Example usage:
  // const result = isWithin20km(latitude1, longitude1, latitude2, longitude2);
  // console.log(result);

  export default isWithin20km