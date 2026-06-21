const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'admin.XYZ.us-east-2.rds.amazonaws.com',
  user: 'name',
  password: '----',
  database: 'database name'
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to RDS ✅");
  }
});

module.exports = db;
