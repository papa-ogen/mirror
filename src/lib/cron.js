import cron from 'node-cron';
import db from './db';
import { getWeather } from './weather'

export async function runCron() {
  const [weather] = await Promise.all([
    getWeather()
  ]);

  db.get('weather')
    .push(weather)
    .write();

  console.log('Done!', weather);
}

cron.schedule(`0 */6 * * *`, () => {
  console.log(`⏲️ RUNNING THE CRON`);
  runCron();
});