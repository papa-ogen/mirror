import cron from 'node-cron';
import db from './db';
import { getWeather } from './weather';

export async function runWeatherCron(io) {
  const weatherResponse = await getWeather();

  weatherResponse.then(weather => {
    db.get('weather')
      .push(weather)
      .write();

    io.emit('weather-response', weather);
    console.log(`⏲️ RUNNING THE CRON SENDING WEATHER @${formatTime()} - `, weather);  // eslint-disable-line
  });
}

// cron.schedule(`0 */6 * * *`, () => {
//   console.log(`RUNNING THE CRON`);
//   runWeatherCron();
// });
