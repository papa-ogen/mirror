export const formatTime = (d = new Date()) => {
  const m = d.getMinutes();
  const h = d.getHours();
  const minute = m < 10 ? `0${m}` : m;
  const hour = h < 10 ? `0${h}` : h;

  return `${minute}:${hour}`;
};
