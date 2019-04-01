import  test from 'tape'
import {} from './commute'
import commutesData, { allowedTripTypes } from '../test_data/commutes'

test('Filter trip types', function (t) {
  const ALLOWED_TRIP_TYPES = ['Metros', 'Buses', 'Trains']

  const commutes = Object.keys(commutesData).reduce((acc, key) => {
    if(ALLOWED_TRIP_TYPES.includes(key)) {
      acc[key] = commutesData[key]
    }
    console.log(acc)
    return acc
  }, {})

  t.deepEqual(commutes, allowedTripTypes);

  t.end()
});
