import { getData } from './getData';

const { TRAFIKLAB_API_KEY, TRAFIKLAB_URL, TRAFIKLAB_SITEID_FINDER } = process.env;
const siteId = 5857;
const ALLOWED_TRIP_TYPES = ['Metros', 'Buses', 'Trains'];

export const filterAllowedTripTypes = (commutes, allowedTripTypes) =>
  Object.keys(commutes).reduce((acc, key) => {
    if (allowedTripTypes.includes(key)) {
      acc[key] = commutes[key];
    }
    return acc;
  }, {});

export const filterCommutes = commutes =>
  Object.keys(commutes).reduce((acc, key) => {
    acc[key] = commutes[key].map(value => {
      const {
        StopAreaName,
        LineNumber,
        TransportMode,
        Destination,
        DisplayTime,
        TimeTabledDateTime,
        ExpectedDateTime,
        Deviations,
      } = value;
      return {
        StopAreaName,
        LineNumber,
        TransportMode,
        Destination,
        DisplayTime,
        TimeTabledDateTime,
        ExpectedDateTime,
        Deviations,
      };
    });
    return acc;
  }, {});
export async function getCommute() {
  const requestUrl = `${TRAFIKLAB_URL}?key=${TRAFIKLAB_API_KEY}&siteid=${siteId}`;
  const commutesData = await getData(requestUrl);
  const filteredCommutes = filterAllowedTripTypes(commutesData.ResponseData, ALLOWED_TRIP_TYPES);
  const commutes = filterCommutes(filteredCommutes);
  return {
    commutes,
  };
}

export async function getCommuteSiteIds(searchstring) {
  const siteIdrequestUrl = `${TRAFIKLAB_SITEID_FINDER}?key=${TRAFIKLAB_API_KEY}&searchstring=${searchstring}`;
  const data = await getData(siteIdrequestUrl);
  return {
    data,
  };
}
