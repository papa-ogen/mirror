import { config as dotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import './lib/cron';
import cron from 'node-cron';
import db, { namedaysDb } from './lib/db';
import { getCommute } from './lib/commute';
import { getWeather } from './lib/weather';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

dotenv();

app.use(cors());

app.get(`/weather`, async (req, res, next) => {
  const weather = await getWeather();
  db.get('weather')
    .push(weather)
    .write();

  res.json(weather);
});

app.get(`/commutes`, async (req, res, next) => {
  const { commutes } = await getCommute();
  db.get('commutes')
    .push(commutes)
    .write();
  res.json(commutes);
});

app.get(`/namedays`, async (req, res, next) => {
  const { nameDays } = namedaysDb.value();
  res.json(nameDays);
});

app.get(`/namedays/:date`, async (req, res, next) => {
  const { nameDays } = namedaysDb.value();

  const match = nameDays.find(day => day.date === req.params.date);
  res.json(match);
});

// Todo: move this
io.on('connection', () => {
  console.log('a user is connected...');
  const { weather } = db.value();
  io.emit('weather-response', weather[weather.length - 1]);

  const { nameDays } = namedaysDb.value();
  const d = new Date();
  const dateId = `${d.getDate()}.${d.getMonth() + 1}`;
  const match = nameDays.find(day => day.date === dateId);

  io.emit('nameday-response', match);
});

// Todo: move this
cron.schedule(`0 */6 * * *`, () => {
  const d = new Date();
  const { weather } = db.value();
  io.emit('weather-response', weather[weather.length - 1]);
  console.log(`⏲️ RUNNING THE CRON SENDING WEATHER @${d.getHours()}:${d.getMinutes()}`);
});

// Todo: move this
cron.schedule(`0 0 * * *`, () => {
  const { nameDays } = namedaysDb.value();
  const d = new Date();
  const dateId = `${d.getDate()}.${d.getMonth() + 1}`;
  const match = nameDays.find(day => day.date === dateId);

  io.emit('nameday-response', match);
  console.log(`⏲️ RUNNING THE CRON SENDING NAMEDAY @${d.getHours()}:${d.getMinutes()}`);
});

http.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);
});
