import { config as dotenv } from 'dotenv'
import express from 'express';
import cors from 'cors'
import './lib/cron'
import db from './lib/db';
import cron from 'node-cron';
import { getCommute } from './lib/commute'

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

dotenv()

app.use(cors());

app.get(`/weather`, async (req, res, next) => {
  const { weather } = db.value();
  res.json(weather[0]);
});

app.get(`/commute`, async (req, res, next) => {
  const { commutes } = await getCommute()
  res.json(commutes);
});

// Todo: move this
io.on('connection', () => {
  console.log('a user is connected...')
  const { weather } = db.value();
  io.emit('weather-response', weather[weather.length-1]);
})

// Todo: move this
cron.schedule(`5 */6 * * *`, () => {
  const { weather } = db.value();
  console.log(`⏲️ RUNNING THE CRON SENDING WEATHER`);
  io.emit('weather-response', weather[weather.length-1]);
});

http.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);
});
