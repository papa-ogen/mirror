import cron from 'node-cron';
import { getWeather } from './weather'

export async function runCron() {
  const [weather] = await Promise.all([
    getWeather()
  ]);

  db.get('weather')
    .push(weather)
    .write();

  console.log('Done!');
}

cron.schedule(`0,30 * * * *`, () => {
  console.log(`⏲️ RUNNING THE CRON`);
  runCron();
});