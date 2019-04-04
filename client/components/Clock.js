import { useEffect, useState } from 'react';
import { useTimer } from '../hooks/timer';
import { useHttp } from '../hooks/http';
import socket from '../socket';
import { months, weekDays } from '../utils/date';

const Module = ({ clock, nameday }) => {
  const names = nameday ? nameday.names.join(', ') : '';
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
          <div className="mm-names">{names}</div>
        </footer>
      </div>
    </section>
  );
};

export default function Clock() {
  const [nameday, setNameday] = useState(null);
  const [clock] = useTimer(3000);
  const [isLoading, fetchedData] = useHttp('http://localhost:9696/namedays/3.7')

  useEffect(() => {
    socket.on('nameday-response', payload => {
      setNameday(payload);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && fetchedData && fetchedData.length > 0) {
    return <Module clock={clock} nameday={fetchedData} />
  }

  return <Module clock={clock} nameday={nameday} />
};
