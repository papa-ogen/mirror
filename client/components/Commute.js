import { useEffect, useState } from 'react';
import axios from 'axios'
import { distanceInWords } from 'date-fns';
import sv from 'date-fns/locale/sv'

export default function Commute() {
  const [commutes, setCommutes] = useState({});
  const timeTableLeaving = commutes['Buses'] ? distanceInWords(new Date(commutes['Buses'][0].TimeTabledDateTime), new Date(), { locale: sv }) : ''
  async function fetchCommutes() {
    const res = await axios(`http://localhost:9696/commute`);
    setCommutes(res.data);
  }

  useEffect(() => {
    fetchCommutes();
  }, {});

  if(!commutes['Buses']) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <h1>Resa</h1>
      <h3>{commutes['Buses'][0].StopAreaName}</h3>
      <h3>Ska gå {commutes['Buses'][0].TimeTabledDateTime}</h3>
      <h3>Förväntad {commutes['Buses'][0].ExpectedDateTime}</h3>
      <h3>om {timeTableLeaving}</h3>
    </section>
  )
}