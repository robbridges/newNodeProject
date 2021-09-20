import axios from 'axios';
import {getWeatherData} from './utils/weather.js';
import { getLocationData } from './utils/location.js';



const weatherData = await getWeatherData('new York')
const locationData = await getLocationData('san francisco');

const latitude = locationData.features[0].geometry.coordinates[1];
const longitude = locationData.features[0].geometry.coordinates[0]
const locationName = locationData.features[0].place_name;


console.log(`It is currently ${weatherData.current.temperature} degrees out. There is ${weatherData.current.precip}% chance of rain`);
console.log(latitude, longitude, locationName);

