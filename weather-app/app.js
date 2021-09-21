
import {getWeatherData} from './utils/weather.js';
import { getLocationData } from './utils/location.js';


// pulls data from the two axios calls and takes an argument for a different location if provided.
const printWeatherAndLocation = async (location = 'yakima') => {
  const weatherData = await getWeatherData(location)
  const locationData = await getLocationData(location);

  const locationName = locationData.features[0].place_name;

  console.log(`Currently in ${locationName} It is currently ${weatherData.current.temperature} degrees out. There is ${weatherData.current.precip}% chance of rain`);
}

printWeatherAndLocation(process.argv[2]);

