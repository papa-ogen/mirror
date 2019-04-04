import { config as dotenv } from 'dotenv';
import { getData } from './getData';

dotenv();

const getIconCssClass = iconCode => {
  switch (iconCode) {
    case '01d':
    case '01n':
      return 'sun';
    case '02d':
    case '02n':
      return 'clouds';
    case '03d':
    case '03n':
      return 'clouds';
    case '04d':
    case '04n':
      return 'broken-cloud';
    case '09d':
    case '09n':
      return 'rainy-2';
    case '10d':
    case '10n':
      return 'rain';
    case '11d':
    case '11n':
      return 'thunder';
    case '13d':
    case '13n':
      return 'snow';
    case '50d':
    case '50n':
      return 'cloudy-night-1';
    default:
      return 'sun';
  }
};

const translateWeatherType = type => {
  switch (type.toLowerCase()) {
    default:
    case 'clear':
    case 'clear sky':
      return 'klart';
    case 'few clouds':
      return 'lite molnigt';
    case 'scattered clouds':
      return 'molnigt';
    case 'broken clouds':
      return 'mulet';
    case 'clouds':
      return 'molnigt';
    case 'shower rain':
      return 'täta regnskurar';
    case 'rain':
      return 'regn';
    case 'thunderstorm':
      return 'åskregn';
    case 'snow':
      return 'snöfall';
    case 'mist':
      return 'dimma';
  }
};

export async function getWeather() {
  const { WEATHER_API_KEY, WEATHER_URL } = process.env;
  const lat = '59.3833';
  const lon = '17.8333';
  const weatherUrl = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
  const data = await getData(weatherUrl);

  return {
    name: data.name,
    temp: Number((data.main.temp - 273.15).toFixed(1)),
    main: data.weather[0].main,
    description: translateWeatherType(data.weather[0].description),
    icon: getIconCssClass(data.weather[0].icon),
    now: Date.now(),
  };
}
