import { config as dotenv } from 'dotenv'
import cors from 'cors'
import express from 'express';
import getWeather from './lib/getWeather'

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