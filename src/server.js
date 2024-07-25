// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'http://localhost:3000',
  user: 'root',
  password: 'PASSWORD',
  database: 'Craft Club'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// CRUD operations for Members
app.get('/api/members', (req, res) => {
  const sql = 'SELECT * FROM members';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/members', (req, res) => {
  const { name, expertise, availability, country } = req.body;
  const sql = 'INSERT INTO members (name, expertise, availability, country) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, expertise, availability, country], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, name, expertise, availability, country });
  });
});

app.delete('/api/members/:id', (req, res) => {
  const sql = 'DELETE FROM members WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Member deleted!' });
  });
});

// CRUD operations for Teams
app.get('/api/teams', (req, res) => {
  const sql = 'SELECT * FROM teams';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/teams', (req, res) => {
  const { name, description, memberIds } = req.body;
  const sql = 'INSERT INTO teams (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    const teamId = result.insertId;
    const teamMembers = memberIds.map(memberId => [teamId, memberId]);
    db.query('INSERT INTO team_members (team_id, member_id) VALUES ?', [teamMembers], (err) => {
      if (err) throw err;
      res.json({ message: 'Team created with members!' });
    });
  });
});

app.put('/api/teams/:id', (req, res) => {
  const sql = 'UPDATE teams SET is_finished = 1 WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Team marked as finished!' });
  });
});

app.delete('/api/teams/:id', (req, res) => {
  const sql = 'DELETE FROM teams WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Team deleted!' });
  });
});

// CRUD operations for Status
app.get('/api/status', (req, res) => {
  const sql = 'SELECT * FROM status';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/status', (req, res) => {
  const { taskId, feedback } = req.body;
  const sql = 'INSERT INTO status (task_id, feedback) VALUES (?, ?)';
  db.query(sql, [taskId, feedback], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, taskId, feedback });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
