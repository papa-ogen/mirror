import express from 'express';
import db, { namedaysDb, commutesDb } from './lib/db';
import { getCommute } from './lib/commute';
import { getWeather } from './lib/weather';

const router = express.Router();

router.get(`/weather`, async (req, res, next) => {
  const weather = await getWeather();
  db.get('weather')
    .push(weather)
    .write();

  res.json(weather);
});

router.get(`/commutes`, async (req, res, next) => {
  const { commutes } = await getCommute();
  commutes.now = Date.now();
  commutesDb
    .get('commutes')
    .push(commutes)
    .write();
  res.json(commutes);
});

router.get(`/namedays`, async (req, res, next) => {
  const { nameDays } = namedaysDb.value();
  res.json(nameDays);
});

router.get(`/namedays/:date`, async (req, res, next) => {
  const { nameDays } = namedaysDb.value();

  const match = nameDays.find(day => day.date === req.params.date);
  res.json(match);
});

export default router;
