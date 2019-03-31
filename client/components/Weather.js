import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../socket';
import { distanceInWords } from 'date-fns';
import sv from 'date-fns/locale/sv'



export default function Weather() {
  const [data, setData] = useState({});

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios('http://localhost:9696/weather')
      if (!ignore) setData(result.data);
    }

    fetchData();
    return () => { ignore = true; }
  }, []);

  function response(res) {
    console.log('hello', res)
  }

  socket.on('weather-response', response)

  const lastFetched = data.now ? distanceInWords(new Date(data.now), new Date(), { locale: sv }) : ''
  return (
    <section>
      <h1>Väder</h1>
      <h3>{data.temp}°</h3>
      <p>{data.weather}</p>
      <p>Senast hämtad {lastFetched}</p>
    </section>
  )
}