const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'se491',
});

connection.connect();

// get

app.get('/account/:username', (req, res) => {
  const username = req.params.username;

  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, accountInfo) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (accountInfo.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = accountInfo[0];

    connection.query('SELECT * FROM patients WHERE patient_id = ?', [user.patient_id], (secondErr, patientInfo) => {
      if (secondErr) {
        return res.status(500).json({ error: 'Error fetching patient data' });
      }

      const patient = patientInfo[0]

      connection.query('SELECT * FROM allergens WHERE allergen_id = ?', [patient.allergen_id], (thirdErr, allergenInfo) => {
        if (thirdErr) {
          return res.status(500).json({ error: 'Error fetching allergen data' });
        }

        const allergen = allergenInfo[0];

        const responseData = {
          user: user,
          patient: patient,
          allergen: allergen,
        };

        res.json(responseData);
      });
    });
  });
});

// post

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  connection.query(query, [username, password], (err, results) => {
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

// put

  // sign up

// delete

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});