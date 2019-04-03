import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Clock() {
  const [namedays, setNamedays] = useState({});
  async function fetchNamedays() {
    const res = await axios(`http://localhost:9696/namedays`);
    setNamedays(res.data);
  }

  useEffect(() => {
    fetchNamedays();
  }, {});

  if(!namedays.length) {
    return <div>Loading...</div>
  }
  return (
<section className="columns mm-clock">
  <div className="column">
    <time className="mm-time">
      <span className="mm-hour">06</span>
      <span className="mm-clock-divider">:</span>
      <span className="mm-minute">53</span></time>
    <footer>
      <div className="mm-date">Onsdag, April 3</div>
      <div className="mm-names">{namedays[2]['3.1'].join(',')}</div>
    </footer>
  </div>
</section>
  )
}