const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // Import path module

const app = express();

// Use CORS middleware to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Support parsing of application/json type post data
app.use(express.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

// Setup your database connection
const db = mysql.createConnection({
  host: 'user.c906o864k7yc.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'minecraft',
  database: 'senior_design_db' // Your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit process with error
  }
  console.log('Connected to the database');
});

app.post('/survey/patients', (req, res) => {
  console.log("Received request with data:", req.body);

  // Extract data from request body
  const { username, password, email, name, gender, skin_tone, state, dob, symptoms } = req.body;

  // Construct SQL query to insert data. Ensure your table and column names match your database schema.
  const query = `
    INSERT INTO patients (username, password, email, name, gender, skin_tone, state, dob, symptoms) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute SQL query using the database connection
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
