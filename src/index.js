import { config as dotenv } from 'dotenv'
import express from 'express';
import cors from 'cors'
import './lib/cron'
import db from './lib/db';
import cron from 'node-cron';
import { getCommute } from './lib/commute'
import { getWeather } from './lib/weather'

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

dotenv()

app.use(cors());

app.get(`/weather`, async (req, res, next) => {
  const weather = await getWeather()
  db.get('weather')
  .push(weather)
  .write()

  res.json(weather);
});

app.get(`/commutes`, async (req, res, next) => {
  const { commutes } = await getCommute()
  db.get('commutes')
  .push(commutes)
  .write()
  res.json(commutes);
});

// Todo: move this
io.on('connection', () => {
  console.log('a user is connected...')
  const { weather } = db.value();
  weather.reverse()
  io.emit('weather-response', weather[0]);
})

// Todo: move this
cron.schedule(`* * * * *`, () => {
  const { weather } = db.value();
  weather.reverse()
  io.emit('weather-response', weather[0]);
  console.log(`⏲️ RUNNING THE CRON SENDING WEATHER`);
});

http.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);
});
