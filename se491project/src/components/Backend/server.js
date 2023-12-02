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

  const { username } = req.params;

  const query = 'SELECT * FROM users WHERE username = ?';

  connection.query(query, [username], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    res.json({ user });
  });
});

// post

app.post('/signup', (req, res) => {

  const query = 'SELECT * FROM users';

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

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

app.put('/account', (req, res) => {

  const query = 'SELECT * FROM users';

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// delete

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});