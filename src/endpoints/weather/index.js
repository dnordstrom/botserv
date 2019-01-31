const axios = require('axios');
const apiKey = process.env.WEATHER_API_KEY;
const client = axios.create({
  baseURL: 'http://api.weatherbit.io/v2.0',
  headers: {
    'Accept': 'application/json'
  }
})

const getWeather = async (city) => {
  let output;

  try {
    const { data } = await client.get(`http://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`);
    console.log(data);
    let temperature = data.data[0].temp;

    temperature = {
      metric: Math.round(temperature),
      imperial: Math.round((temperature * 1.8) + 32)
    }

    output = 
      `${data.data[0].weather.description} and ${temperature.imperial}°F/${temperature.metric}°C`;
  } catch (err) {
    output = `Couldn't find city.`;
  }

  return output;
}

const handleWeatherRoute = async (request, reply) => {
  const city = 
    decodeURIComponent(request.params.city) || 
    decodeURIComponent(request.query.defaultCity);
  return city ? await getWeather(city) : 'No city specified.';
}

module.exports = {
  '/weather/:city': handleWeatherRoute 
}