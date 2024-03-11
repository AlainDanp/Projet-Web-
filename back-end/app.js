const express = require('express');
const { connects } = require('./dbConnection');

const app = express();
const connection = connects(); // Crée une connexion à la base de données

// Route pour /test
app.use('/test', (req, res, next) => {
  connection.query('SELECT * FROM utilisateurs', (err, rows, fields) => {
    if (err) {
      throw err;
    }
    res.json({ message: rows });
  });
});

module.exports = app;