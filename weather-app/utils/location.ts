import axios from 'axios';

const getLocationData = async (location = 'yakima') => {
  try {
    const {data} = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoicm9iLWJyaWRnZXMiLCJhIjoiY2t0czBqN3Z5MWJxMTJwbzMzeDU4aHgzeCJ9.obkBOhszx7ZArn7rpnLsEw&limit=1`);

    return data;
  } catch (e) {
    console.error(e);
  }
}

export {
  getLocationData
}