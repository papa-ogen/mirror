import { useEffect, useState } from 'react';
import { distanceInWords } from 'date-fns';
import sv from 'date-fns/locale/sv'
import { useHttp } from '../hooks/http';
import socket from '../socket';

const Module = ({ weather }) => {
  const lastFetched = distanceInWords(new Date(weather.now), new Date(), { locale: sv });

  return (
    <section className="module">
      <h1>Väder</h1>
      <h3>{weather.temp}°</h3>
      <p>{weather.weather}</p>
      <p>Senast hämtad {lastFetched} sen</p>
    </section>
  );
};

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, fetchedData] = useHttp('http://localhost:9696/weather');

  useEffect(() => {
    socket.on('weather-response', payload => {
      setWeather(payload);
    });
  }, {});

  if (!isLoading && fetchedData && fetchedData.now) {
    return <Module weather={fetchedData} />;
  }

  if (weather) {
    return <Module weather={weather} />;
  }

  return <div>Loading...</div>;
}
