import axios from 'axios';

const url = 'http://api.weatherstack.com/current?access_key=e61d54f37409906fc4a83d8b8e27ee76&query=yakima'

const getWeatherData = async () => { 
  try {
    const {data} = await axios.get(url);
    
    return data
  } catch (error) {
    console.error(error);
  }
  
}

const weatherData = await getWeatherData();


console.log(weatherData.location.name);

