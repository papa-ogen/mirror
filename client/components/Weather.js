import { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <section>
      <h1>Weather</h1>
      <pre>{console.log(data)}</pre>
    </section>
  )
}