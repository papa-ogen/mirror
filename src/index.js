import { config as dotenv } from 'dotenv'
import express from 'express';
import cors from 'cors'
import './lib/cron'
import { getWeather } from './lib/weather'

dotenv()

const app = express();

app.use(cors());

app.get(`/weather`, async (req, res, next) => {
  const weather = await getWeather()
  res.json(weather);
});

app.listen(process.env.PORT, () => {
  console.log(`Example App running on port http://localhost:${process.env.PORT}`);
});