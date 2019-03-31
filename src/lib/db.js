import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({ weather: [] }).write();

export default db;