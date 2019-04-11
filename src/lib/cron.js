import cron from 'node-cron';
import db from './db';
import { fetchWeather } from './weather';

export async function runWeatherCron(io) {
  const [weather] = await Promise.all([fetchWeather()]);

  db.get('weather')
    .push(weather)
    .write();

  io.emit('weather-response', weather);
  console.log(`⏲️ RUNNING THE CRON SENDING WEATHER @${formatTime()} - `, weather);  // eslint-disable-line
}
