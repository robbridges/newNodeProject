import axios from 'axios';


const locationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/yakima.json?access_token=pk.eyJ1Ijoicm9iLWJyaWRnZXMiLCJhIjoiY2t0czBqN3Z5MWJxMTJwbzMzeDU4aHgzeCJ9.obkBOhszx7ZArn7rpnLsEw&limit=1'

const getWeatherData = async (location = 'yakima') => { 
  try {
    const {data} = await axios.get(`http://api.weatherstack.com/current?access_key=e61d54f37409906fc4a83d8b8e27ee76&query=${location}&units=f`);
    
    return data;
  } catch (e) {
    console.error(e);
  }
  
}

const getLocationData = async (location = 'yakima') => {
  try {
    const {data} = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoicm9iLWJyaWRnZXMiLCJhIjoiY2t0czBqN3Z5MWJxMTJwbzMzeDU4aHgzeCJ9.obkBOhszx7ZArn7rpnLsEw&limit=1`);

    return data;
  } catch (e) {
    console.error(e);
  }
}

const weatherData = await getWeatherData();
const locationData = await getLocationData('new york');

const latitude = locationData.features[0].geometry.coordinates[1];
const longitude = locationData.features[0].geometry.coordinates[0]
const locationName = locationData.features[0].place_name;


console.log(`It is currently ${weatherData.current.temperature} degrees out. There is ${weatherData.current.precip}% chance of rain`);
console.log(latitude, longitude, locationName);

