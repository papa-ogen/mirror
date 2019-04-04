import { useEffect, useState } from 'react';
import { distanceInWords } from 'date-fns';
import sv from 'date-fns/locale/sv';
import PropTypes from 'prop-types';
import { useHttp } from '../hooks/http';
import socket from '../socket';

const Module = ({ weather }) => {
  const lastFetched = distanceInWords(new Date(weather.now), new Date(), { locale: sv });

  return (
    <section className="module weather">
      <h1>
        {weather.name} {weather.temp}°
      </h1>
      <img src={`/static/images/icons/${weather.icon}.svg`} alt={weather.main} />
      <p>{weather.description}</p>
      <span>
        <b>Senast hämtad...</b> <br /> {lastFetched} sen
      </span>
    </section>
  );
};

Module.propTypes = {
  weather: PropTypes.object,
};

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, fetchedData] = useHttp('http://localhost:9696/weather');

  useEffect(() => {
    socket.on('weather-response', payload => {
      setWeather(payload);
    });
  }, {});

  if (weather) {
    return <Module weather={weather} />;
  }

  if (!isLoading && fetchedData && fetchedData.now) {
    return <Module weather={fetchedData} />;
  }

  return <div>Loading...</div>;
}
