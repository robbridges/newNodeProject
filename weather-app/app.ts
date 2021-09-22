
import {getWeatherData} from './utils/weather.js';
import { getLocationData } from './utils/location.js';


// pulls data from the two axios calls and takes an argument for a different location if provided.
const printWeatherAndLocation = async (location = 'yakima') => {
  const weatherData = await getWeatherData(location)
  const locationData = await getLocationData(location);

  const locationName : string = locationData.features[0].place_name;
  const currentTemp : number = weatherData.current.temperature;
  const precipChance : number = weatherData.current.precip

  console.log(`Currently in ${locationName} It is currently ${currentTemp} degrees out. There is ${precipChance}% chance of rain`);
}

printWeatherAndLocation(process.argv[2]);

