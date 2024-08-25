import axios from 'axios'

async function findCityFromCoordinates(lat,long){
    const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY
    let response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat+','+long}&key=${API_KEY}`)
    // let response = await axios.get(`https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    console.log('response from findCity = ',response.data.results[0].components.county)
    return response.data.results[0].components.county
}

export default findCityFromCoordinates