import { namedaysDb } from './db';

export const getTodaysNameday = async (d = new Date()) => {
  const { nameDays } = namedaysDb.value();
  const dateId = `${d.getDate()}.${d.getMonth() + 1}`;
  return nameDays.find(day => day.date === dateId);
};
