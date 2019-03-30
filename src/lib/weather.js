import { config as dotenv } from 'dotenv'
import { getData } from './getData'

dotenv()

const apiKey = process.env.WEATHER_API_KEY
const apiUrl = process.env.WEATHER_URL
const forecastUrl = process.env.WEATHER_FORECAST_URL
const lat = "59.3833"
const lon = "17.8333"

const weatherUrl = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`

export async function getWeather() {
  const data = await getData(weatherUrl)
  
  return {
    temp: Number((data.main.temp - 273.15).toFixed(1)),
    weather: data.weather[0].description,
    now: Date.now()
  }
}