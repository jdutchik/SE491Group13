const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Import http-proxy-middleware
require('dotenv').config();
const path = require('path');

const app = express();

// Manual CORS Configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Support parsing of application/json type post data
app.use(express.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

// Setup your database connection
const db = mysql.createConnection({
  host: 'user.c906o864k7yc.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'minecraft',
  database: 'senior_design_db'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

app.post('/survey/patients', (req, res) => {
  console.log("Received request with data:", req.body);

  const { username, password, email, name, gender, skin_tone, state, dob, symptoms } = req.body;

  const query = `
    INSERT INTO patients (username, password, email, name, gender, skin_tone, state, dob, symptoms) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [username, password, email, name, gender, skin_tone, state, dob, symptoms], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).send("Error updating the database");
    } else {
      console.log("Database updated successfully:", results);
      res.status(200).send("Patient data submitted successfully");
    }
  });
});

// Create a proxy for all other routes
const apiProxy = createProxyMiddleware({
  target: 'http://ec2-54-87-221-186.compute-1.amazonaws.com:4000', // Replace with your actual server address and port
  changeOrigin: true,
  method: 'POST'
});

// Use the proxy for all other routes
app.use(apiProxy);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the frontend app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
