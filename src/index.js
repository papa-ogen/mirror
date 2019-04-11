import { config as dotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { runWeatherCron } from './lib/cron';
import routes from './routes';
import { getCommute } from './lib/commute';
import { getWeather } from './lib/weather';
import { getTodaysNameday } from './lib/nameDays';
import { formatTime } from './lib/utils';

dotenv();

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(cors());

app.use('/', routes);

io.on('connection', () => {
  console.log('a user is connected...'); // eslint-disable-line

  io.emit('weather-response', getWeather());
  io.emit('nameday-response', getTodaysNameday());
});

// At minute 0 past every 6th hour from 0 through 23
cron.schedule(`0 */6 * * *`, () => {
  runWeatherCron(io);
});

// At 00:00
cron.schedule(`0 0 * * *`, () => {
  io.emit('nameday-response', getTodaysNameday());
  console.log(`⏲️ RUNNING THE CRON SENDING NAMEDAY @${formatTime()}`);  // eslint-disable-line
});

// At every minute past every hour from 7 through 9 on every day-of-week from Monday through Friday.
cron.schedule(`* 6-9 * * 1-5`, () => {
  getCommute().then(res => {
    res.commutes.now = Date.now();
    io.emit('commutes-response', res.commutes);
    console.log(`⏲️ RUNNING THE CRON SENDING MORNING COMMUTES @${formatTime()}`);  // eslint-disable-line
  });
});

// At every 15th minute from 0 through 59 past every hour from 9 through 22 on every day-of-week from Monday through Friday.
cron.schedule(`0/15 9-22 * * *`, () => {
  getCommute().then(res => {
    res.commutes.now = Date.now();
    io.emit('commutes-response', res.commutes);
    console.log(`⏲️ RUNNING THE CRON SENDING COMMUTES @${formatTime()}`);  // eslint-disable-line
  });
});

const PORT = process.env.PORT || 6969;

http.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);  // eslint-disable-line
});
