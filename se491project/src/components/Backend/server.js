const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const { stdout } = require('process');

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
  host: "user.c906o864k7yc.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "minecraft",
  database: "senior_design_db"
});

connection.connect();

// get

// patient info

app.get('/patient/:username', (req, res) => {
  const username = req.params.username;

  connection.query('SELECT * FROM patients WHERE username = ?', [username], (error, patient) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (patient.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(patient);
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

// product list

app.get('/products/:username', (req, res) => {
  const username = req.params.username;

  console.log(username);

  connection.query('SELECT * FROM patients WHERE username = ?', [username], (error, patient) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching patient data' });
    }

    if (patient.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const ingredients = patient[0].ingredients;

    if (ingredients == null) {
      return res.status(404).json({ error: 'No Ingredients' });
    }

    const split_ing = ingredients.split(';');

    connection.query('SELECT * FROM products', (error, products) => {
      if (error) {
        return res.status(500).json({ error: 'Error fetching PRODUCT data' });
      }

      if (products.length === 0) {
        return res.status(404).json({ error: 'PRODUCT not found' });
      }

      const listed_products = [];

      for (const pro of products) {
        for (let i = 0; i < (split_ing.length-1); i++) {
          if (pro.allergens.includes(split_ing[i])) {
            listed_products.push(pro.name);
            i = split_ing.length;
          } 
          
          else {
            console.log('Substring not found');
          }
        }
      }

      console.log(listed_products);
      res.json(listed_products);
    });
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

// mine

app.post('/survey/patient', (req, res) => {
  const { email, name, username, password, dob, gender, state, skin_tone, symptoms, doc } = req.body;

  // Check if the provided doctor code exists in the doctors table
  connection.query('SELECT * FROM doctors WHERE docCode = ?', [doc], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ success: false, message: 'Invalid doctor code' });
    }
    if (results.length === 0) {
      // No doctor found with the given docCode
      return res.status(400).json({ success: false, message: 'Doctor code invalid' });
    }
    
    const relativePath = './ai_model.py';
    const absolutePath = path.resolve(__dirname, relativePath);

    const json_string = `${gender};${dob};${skin_tone};${symptoms};${state};`
    const no_spaces  = json_string.replace(/\s/g, '')

    const command = `python3 ${absolutePath} "${no_spaces}"`;

    console.log(command)
    console.log(req.body);

    exec(command, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          res.status(500).send('Internal Server Error');
          return;
      }

      console.log(`This is from the server: ${stdout}`);
    });

    // Doctor found, proceed with inserting patient data
    const query = `INSERT INTO patients (email, name, username, dob, gender, state, skin_tone, symptoms, doc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [email, name, username, dob, gender, state, skin_tone, symptoms, doc], (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error executing MySQL query:', insertErr);
        return res.status(500).json({ success: false, message: 'Wrong doctor code' });
      }
      if (insertResults.affectedRows > 0) {
        res.json({ success: true, message: 'Patient data submitted successfully' });
      } else {
        res.status(400).json({ success: false, message: 'Failed to insert patient data' });
      }
    });
  });
});

// get patient info

// delete

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});