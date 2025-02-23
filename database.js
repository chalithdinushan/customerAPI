const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      date_of_birth TEXT NOT NULL,
      gender TEXT CHECK(gender IN ('male', 'female', 'other')) NOT NULL,
      age INTEGER CHECK(age > 0) NOT NULL,
      cardHolderName TEXT NOT NULL,
      cardNumber TEXT NOT NULL CHECK(length(cardNumber) = 12),
      expiryDate TEXT NOT NULL,
      cvv TEXT NOT NULL CHECK(length(cvv) = 3),
      timeStamp TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

module.exports = db;
