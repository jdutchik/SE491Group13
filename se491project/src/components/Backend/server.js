const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3001;

// CORS options
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow only specific headers
};

app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(bodyParser.json()); // Body parser for JSON encoded bodies

const connection = mysql.createConnection({
  host: 'user.c906o864k7yc.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'minecraft',
  database: 'senior_design_db',
});

connection.connect();

// get

// patient info

app.get('/patient/:username', (req, res) => {
  const username = req.params.username;

  connection.query('SELECT * FROM patients WHERE username = ?', [username], (error, accountInfo) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (accountInfo.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(res.json(patient));
  });
});

// doctor info

app.get('/doctor/:username', (req, res) => {
  const username = req.params.username;

  connection.query('SELECT * FROM doctors WHERE username = ?', [username], (error, doctor) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching doctor data' });
    }

    if (doctor.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(doctor);
  });
});

// post

app.post('/login', (req, res) => {
  const { username } = req.body;

  const query = 'SELECT * FROM doctors WHERE username = ?';

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    }

    else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// hopefully survey post request



// get patient info

// delete

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});