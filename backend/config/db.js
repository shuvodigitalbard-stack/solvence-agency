const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = process.env.SQLITE_DB || path.join(__dirname, '..', 'agency.db');
let sqlDb;

async function initDB() {
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    sqlDb = new SQL.Database(buffer);
  } else {
    sqlDb = new SQL.Database();
  }

  sqlDb.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, role TEXT DEFAULT 'staff', avatar TEXT DEFAULT '',
    is_active INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  sqlDb.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL, full_description TEXT DEFAULT '', icon TEXT DEFAULT '🚀',
    image TEXT DEFAULT '', features TEXT DEFAULT '[]', price_type TEXT DEFAULT 'custom',
    price_amount REAL DEFAULT 0, price_currency TEXT DEFAULT 'USD',
    category TEXT DEFAULT 'other', is_active INTEGER DEFAULT 1, sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  sqlDb.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT DEFAULT '',
    phone TEXT DEFAULT '', company TEXT DEFAULT '', status TEXT DEFAULT 'active',
    notes TEXT DEFAULT '', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  sqlDb.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL,
    subject TEXT DEFAULT '', message TEXT NOT NULL, status TEXT DEFAULT 'unread',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  sqlDb.run(`CREATE TABLE IF NOT EXISTS team (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, role TEXT NOT NULL,
    bio TEXT DEFAULT '', avatar TEXT DEFAULT '', sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  sqlDb.run(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY, value TEXT DEFAULT '', updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  try { persist(); } catch(e) {}
  console.log('SQLite tables initialized');
  return sqlDb;
}

function persist() {
  if (!sqlDb) return;
  const data = sqlDb.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function db() {
  if (!sqlDb) throw new Error('Call initDB() first');
  return sqlDb;
}

function run(sql, params = []) {
  db().run(sql, params);
  try { persist(); } catch(e) {}
  const res = db().exec('SELECT last_insert_rowid() as id');
  return { lastInsertRowid: res[0]?.values[0]?.[0] || 0 };
}

function getOne(sql, params = []) {
  const res = db().exec(sql, params);
  if (!res.length || !res[0].values.length) return null;
  const obj = {};
  res[0].columns.forEach((c, i) => obj[c] = res[0].values[0][i]);
  return obj;
}

function getAll(sql, params = []) {
  const res = db().exec(sql, params);
  if (!res.length) return [];
  return res[0].values.map(vals => {
    const obj = {};
    res[0].columns.forEach((c, i) => obj[c] = vals[i]);
    return obj;
  });
}

module.exports = { initDB, db, persist, run, getOne, getAll };
