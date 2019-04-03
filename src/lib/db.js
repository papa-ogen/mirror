import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({ weather: [], commutes: [] }).write();

export default db;

const namedaysAdapter = new FileSync('data/namedays.json')
const namedaysDb = low(namedaysAdapter)
namedaysDb.defaults({ nameDays: [] }).write();
export {
  namedaysDb 
}
