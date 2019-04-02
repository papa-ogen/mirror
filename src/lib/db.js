import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({ weather: [], commutes: [] }).write();

export default db;