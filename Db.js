const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Création d'une table pour les utilisateurs
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`);

// Création d'une table pour les publications
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    content TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )
`);

module.exports = db;
