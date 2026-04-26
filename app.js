const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Register API
app.post('/register', (req, res) => {
  const {
    name,
    email,
    phone,
    course,
    year,
    college,
    skills,
    gender,
    resume
  } = req.body;

  // Validation
  if (!name || !email || !phone || !course) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const query = `
    INSERT INTO registrations 
    (name, email, phone, course, year, college, skills, gender, resume) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query,
    [name, email, phone, course, year, college, skills, gender, resume],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Registration Successful 🎉" });
    }
  );
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000 🚀");
});