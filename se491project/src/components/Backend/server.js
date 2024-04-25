const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'user.c906o864k7yc.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'minecraft',
  database: 'senior_design_db'
});

connection.connect();

// get

  // patient info

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

      connection.query('SELECT * FROM doctors WHERE doctor_id = ?', [patient.doctor_id], (thirdErr, doctorInfo) => {
        if (thirdErr) {
          return res.status(500).json({ error: 'Error fetching doctor data' });
        }

        const doctor = doctorInfo[0];

        const responseData = {
          user: user,
          patient: patient,
          doctor: doctor,
        };

        res.json(responseData);
      });
    });
  });
});

  // doctor info

  app.get('/doctor/:code', (req, res) => {
    const code = req.params.code;
  
    connection.query('SELECT * FROM doctors WHERE code = ?', [code], (error, accountInfo) => {
      if (error) {
        return res.status(500).json({ error: 'Error fetching doctor data' });
      }
  
      if (accountInfo.length === 0) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      const doctor = accountInfo[0];
  
      connection.query('SELECT patients.* FROM patients, doctors WHERE patients.doctor_id = doctors.doctor_id AND doctors.code = ?', 
      [code], (secondErr, patientInfo) => {
        if (secondErr) {
          return res.status(500).json({ error: 'Error fetching patient data' });
        }
  
        const patient = patientInfo[0];
  
        connection.query('SELECT * FROM allergens WHERE allergen_id = ?', [patient.allergen_id], (thirdErr, allergenInfo) => {
          if (thirdErr) {
            return res.status(500).json({ error: 'Error fetching allergen data' });
          }
  
          const allergen = allergenInfo[0];
  
          const responseData = {
            doctor: doctor,
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

app.post('/login/doctor', (req, res) => {
  const { password, code } = req.body;

  const query = 'SELECT * FROM doctors WHERE code = ? AND password = ?';

  connection.query(query, [code, password], (err, results) => {
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

app.post('/survey/patient', (req, res) => {
  console.log(req.body);
  const { email, name, username, password, dob, gender, state, skin_tone, symptoms } = req.body;
  
  const values_string = "('" + email + "','" + name + "','" + username + "','" + password + "','" + dob + "','" +
  gender + "','" + state + "','" + skin_tone + "','" + symptoms + "');";

  const query = 'INSERT INTO patients (email, name, username, password, dob, gender, state, skin_tone, symptoms) VALUES' + values_string;

  console.log(query);

  connection.query(query, (err, results) => {
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

// get patient info

// mine

app.post('/login/doctor', (req, res) => {
  const { password, code } = req.body;

  const query = 'SELECT * FROM doctors WHERE code = ? AND password = ?';

  connection.query(query, [code, password], (err, results) => {
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

  // patient sign up

// delete

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});