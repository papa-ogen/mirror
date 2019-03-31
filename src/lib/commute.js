import { config as dotenv } from 'dotenv'
import { getData } from './getData'

dotenv()

const apiKey = process.env.TRAFIKLAB_API_KEY
const apiUrl = process.env.TRAFIKLAB_URL
const siteIdUrl = process.env.TRAFIKLAB_SITEID_FINDER
const siteId = 5857
const ALLOWED_TRIP_TYPES = ['Metros', 'Buses', 'Trains']

export async function getCommute() {
  const requestUrl = `${apiUrl}?key=${apiKey}&siteid=${siteId}`
  const commutes = await getData(requestUrl)
  return {
   commutes
  }
}

export async function getCommuteSiteIds(searchstring) {
  const siteIdrequestUrl = `${siteIdUrl}?key=${apiKey}&searchstring=${searchstring}`
  console.log(siteIdrequestUrl)
  const data = await getData(siteIdrequestUrl)
  return {
   data
  }
}