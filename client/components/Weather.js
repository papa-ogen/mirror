import { useEffect, useState } from 'react';
import socket from '../socket';
import { distanceInWords } from 'date-fns';
import sv from 'date-fns/locale/sv'

export default function Weather() {
  const [weather, setWeather] = useState({});
  const lastFetched = weather.now ? distanceInWords(new Date(weather.now), new Date(), { locale: sv }) : ''

  useEffect(() => {
    socket.on('weather-response', payload => {
      setWeather(payload);
    });
  }, [weather]);

  return (
    <section className='module'>
      <h1>Väder</h1>
      <h3>{weather.temp}°</h3>
      <p>{weather.weather}</p>
      <p>Senast hämtad {lastFetched} sen</p>
    </section>
  )
}