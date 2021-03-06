import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTimer } from '../hooks/timer';
import { useHttp } from '../hooks/http';
import socket from '../socket';
import { months, weekDays, formatTime } from '../utils/date';

const Module = ({ clock, nameday }) => {
  const names = nameday ? nameday.names.join(', ') : '';
  const { hour, minute } = formatTime(clock.hour, clock.minute);
  return (
    <section className="columns mm-clock">
      <div className="column">
        <time className="mm-time">
          <span className="mm-hour">{hour}</span>
          <span className="mm-clock-divider">:</span>
          <span className="mm-minute">{minute}</span>
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

Module.propTypes = {
  clock: PropTypes.object,
  nameday: PropTypes.object,
};

export default function Clock() {
  const [nameday, setNameday] = useState(null);
  const [clock] = useTimer(3000);
  const d = new Date();
  const [isLoading, fetchedData] = useHttp(`http://localhost:9696/namedays/${d.getDate()}.${d.getMonth() + 1}`);

  useEffect(() => {
    socket.on('nameday-response', payload => {
      setNameday(payload);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && fetchedData && fetchedData.names) {
    return <Module clock={clock} nameday={fetchedData} />;
  }

  return <Module clock={clock} nameday={nameday} />;
}
