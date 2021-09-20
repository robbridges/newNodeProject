import axios from 'axios'

const getWeatherData = async (location = 'yakima') => { 
  try {
    const {data} = await axios.get(`http://api.weatherstack.com/current?access_key=e61d54f37409906fc4a83d8b8e27ee76&query=${location}&units=f`);
    
    return data;
  } catch (e) {
    console.error(e);
  }
  
}

export  {
  getWeatherData,
}