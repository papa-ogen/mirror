import { useEffect, useState } from 'react';
import { distanceInWords } from 'date-fns';
import sv from 'date-fns/locale/sv';
import PropTypes from 'prop-types';
import { useHttp } from '../hooks/http';
import { useTimer } from '../hooks/timer';
import socket from '../socket';
import { formatTimeStamp } from '../utils/date';

const Module = ({ commute }) => {
  const leavingAt = formatTimeStamp(commute.TimeTabledDateTime);
  const estimatedLeavingAt = formatTimeStamp(commute.ExpectedDateTime);
  return (
    <article className="module--content">
      <p>
        Buss {commute.LineNumber} mot {commute.Destination}
      </p>
      <p>Ska gå klockan {leavingAt}</p>
      <p>Förväntad avgång {estimatedLeavingAt}</p>
      <p>om {commute.DisplayTime}</p>
    </article>
  );
};

Module.propTypes = {
  commute: PropTypes.object,
};

export default function Commute() {
  const [commutes, setCommutes] = useState(null);
  const [isLoading, fetchedData] = useHttp('http://localhost:9696/commutes');
  const [timer] = useTimer(1000 * 60);

  useEffect(() => {
    socket.on('commutes-response', payload => {
      setCommutes(payload);
    });
  }, {});

  if (commutes) {
    const commutesMarkup = commutes.Buses.map(commute => <Module commute={commute} />);
    const lastFetched = distanceInWords(new Date(commutes.now), new Date(), { locale: sv });

    if (!commutes.Buses.length) {
      return <div>Hittar inga rutter</div>;
    }
    return (
      <section className="module">
        <h1>{commutes.Buses[0].StopAreaName}</h1>
        {commutesMarkup}
        <span>
          <b>Senast hämtad...</b> <br /> {lastFetched} sen
        </span>
      </section>
    );
  }

  if (!isLoading && fetchedData && fetchedData.Buses) {
    const commutesMarkup = fetchedData.Buses.slice(0, 5).map((commute, i) => <Module key={i} commute={commute} />);
    const lastFetched = distanceInWords(new Date(fetchedData.now), new Date(timer.now), { locale: sv });

    if (!fetchedData.Buses.length) {
      return <div>Hittar inga rutter</div>;
    }
    return (
      <section className="module">
        <h1>{fetchedData.Buses[0].StopAreaName}</h1>
        {commutesMarkup}
        <span>
          <b>Senast hämtad...</b> <br /> {lastFetched} sen
        </span>
      </section>
    );
  }

  return <div>Loading...</div>;
}
