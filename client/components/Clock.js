import { useEffect, useState } from 'react';
import { useTimer } from '../hooks/timer';
import socket from '../socket';

const months = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'Oktober',
  'September',
  'November',
  'December',
];
const weekDays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

export default function Clock() {
  const [nameday, setNameday] = useState(null);

  const [clock] = useTimer(3000);

  useEffect(() => {
    socket.on('nameday-response', payload => {
      setNameday(payload);
    });
  }, []);

  if (!nameday) {
    return <div>Loading...</div>;
  }

  return (
    <section className="columns mm-clock">
      <div className="column">
        <time className="mm-time">
          <span className="mm-hour">{clock.hour}</span>
          <span className="mm-clock-divider">:</span>
          <span className="mm-minute">{clock.minute}</span>
        </time>
        <footer>
          <div className="mm-date">
            {weekDays[clock.weekday]}, {months[clock.month]} {clock.date}
          </div>
          <div className="mm-names">{nameday.names.join(', ')}</div>
        </footer>
      </div>
    </section>
  );
}
