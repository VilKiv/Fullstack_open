import axios from 'axios'

const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&'

const getWeather = (lat,lon) => {
  const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`)
  return request.then(response => response.data)
}

export default { getWeather }