import test from 'tape';
import { filterAllowedTripTypes, filterCommutes } from './commute';
import commutesData, { allowedTripTypes, tripDetails } from '../test_data/commutes';

test('Filter trip types', function(t) {
  const ALLOWED_TRIP_TYPES = ['Metros', 'Buses', 'Trains'];

  const commutes = filterAllowedTripTypes(commutesData, ALLOWED_TRIP_TYPES);

  t.deepEqual(commutes, allowedTripTypes);

  t.end();
});

test('Filter trip details', function(t) {
  const filteredCommutes = filterCommutes(allowedTripTypes);

  t.deepEqual(filteredCommutes, tripDetails);

  t.end();
});
