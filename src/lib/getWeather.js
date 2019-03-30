import { config as dotenv } from 'dotenv'
import { getData } from './getData'

dotenv()

const weatherConfig = {
  apiKey: process.env.WEATHER_API_KEY,
  apiUrl: process.env.WEATHER_URL,
  forecastUrl: process.env.WEATHER_FORECAST_URL,
  lat: "59.3833",
  lon: "17.8333"
}

const url = 'http://api.openweathermap.org/data/2.5/weather'
const weatherUrl = `${url}?lat=${weatherConfig.lat}&lon=${weatherConfig.lon}&appid=${weatherConfig.apiKey}`

export default async function() {
  return await getData(weatherUrl)
}