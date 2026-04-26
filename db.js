const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'admin.cv6uoyiksi4c.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: '123456789',
  database: 'eventdb'
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to RDS ✅");
  }
});

module.exports = db;