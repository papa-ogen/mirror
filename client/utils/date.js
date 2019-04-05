export const months = [
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

export const weekDays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

export const formatTime = (h, m) => {
  const minute = m < 10 ? `0${m}` : m;
  const hour = h < 10 ? `0${h}` : h;

  return {
    hour,
    minute,
  };
};
