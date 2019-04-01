import { config as dotenv } from 'dotenv'
import { getData } from './getData'

dotenv()

const apiKey = process.env.TRAFIKLAB_API_KEY
const apiUrl = process.env.TRAFIKLAB_URL
const siteIdUrl = process.env.TRAFIKLAB_SITEID_FINDER
const siteId = 5857
const ALLOWED_TRIP_TYPES = ['Metros', 'Buses', 'Trains']

export const filterAllowedTripTypes = (commutes, allowedTripTypes) => {
  return Object.keys(commutes).reduce((acc, key) => {
    if (allowedTripTypes.includes(key)) {
      acc[key] = commutes[key]
    }
    return acc
  }, {})
}

export const filterCommutes = (commutes) => {
  return Object.keys(commutes).reduce((acc, key) => {
    acc[key] = commutes[key].map((value) => {
      return {
        time: value.prop1,
        type: value.prop2,
      }
    })
    return acc
  }, {})
}
export async function getCommute() {
  const requestUrl = `${apiUrl}?key=${apiKey}&siteid=${siteId}`
  const commutesData = await getData(requestUrl)
  const commutes = filterAllowedTripTypes(commutesData, ALLOWED_TRIP_TYPES)

  return {
    commutes
  }
}

export async function getCommuteSiteIds(searchstring) {
  const siteIdrequestUrl = `${siteIdUrl}?key=${apiKey}&searchstring=${searchstring}`
  const data = await getData(siteIdrequestUrl)
  return {
    data
  }
}