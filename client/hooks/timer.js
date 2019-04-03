import { useState, useEffect } from 'react';

export const useTimer = interval => {
  const init = new Date();
  const [clock, setClock] = useState({
    hour: init.getHours(),
    minute: init.getMinutes(),
    weekday: init.getDay(),
    month: init.getMonth(),
    date: init.getDate(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setClock({
        hour: d.getHours(),
        minute: d.getMinutes(),
        weekday: d.getDay(),
        month: d.getMonth(),
        date: d.getDate(),
      });
    }, interval);

    return () => {
      clearTimeout(timer);
    };
  }, [interval]);

  return [clock];
};
