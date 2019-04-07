import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { runWeatherCron } from './lib/cron';
import routes from './routes/routes';
import db, { namedaysDb } from './lib/db';
import { getCommute } from './lib/commute';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(cors());

app.use('/', routes);

// Todo: move this
io.on('connection', () => {
  console.log('a user is connected...'); // eslint-disable-line
  const { weather } = db.value();
  io.emit('weather-response', weather[weather.length - 1]);

  const { nameDays } = namedaysDb.value();
  const d = new Date();
  const dateId = `${d.getDate()}.${d.getMonth() + 1}`;
  const match = nameDays.find(day => day.date === dateId);

  io.emit('nameday-response', match);
});

// Todo: move this
// At minute 0 past every 6th hour from 0 through 23
cron.schedule(`0 */6 * * *`, () => {
  const d = new Date();
  const weatherRes = runWeatherCron(io);
  weatherRes.then(weather => {
    io.emit('weather-response', weather);
    console.log(`⏲️ RUNNING THE CRON SENDING WEATHER @${d.getHours()}:${d.getMinutes()} - `, weather);  // eslint-disable-line
  });
});

// Todo: move this
// At 00:00
cron.schedule(`0 0 * * *`, () => {
  const { nameDays } = namedaysDb.value();
  const d = new Date();
  const dateId = `${d.getDate()}.${d.getMonth() + 1}`;
  const match = nameDays.find(day => day.date === dateId);

  io.emit('nameday-response', match);
  console.log(`⏲️ RUNNING THE CRON SENDING NAMEDAY @${d.getHours()}:${d.getMinutes()}`);  // eslint-disable-line
});

// Todo: move this
// At every minute past every hour from 7 through 9 on every day-of-week from Monday through Friday.
cron.schedule(`* 7-9 * * 1-5`, () => {
  getCommute().then(res => {
    const d = new Date();
    res.commutes.now = Date.now();
    io.emit('commutes-response', res.commutes);
    console.log(`⏲️ RUNNING THE CRON SENDING MORNING COMMUTES @${d.getHours()}:${d.getMinutes()}`);  // eslint-disable-line
  });
});

// At every 15th minute from 0 through 59 past every hour from 9 through 22 on every day-of-week from Monday through Friday.
cron.schedule(`0/15 9-22 * * *`, () => {
  getCommute().then(res => {
    const d = new Date();
    res.commutes.now = Date.now();
    io.emit('commutes-response', res.commutes);
    console.log(`⏲️ RUNNING THE CRON SENDING COMMUTES @${d.getHours()}:${d.getMinutes()}`);  // eslint-disable-line
  });
});

http.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);  // eslint-disable-line
});
