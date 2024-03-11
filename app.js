const express = require('express');
const session = require('express-session');
const { connects } = require('./dbConnection');
const produitsRouter = require('./router_Products');
const connexionRouter = require('./router_connexion');
const ideaRouter = require('./router_idée');


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

app.use(express.json());

// Utilisation du routeur pour les produits

app.use('/produits', produitsRouter);
app.use('/connexion',connexionRouter);

app.use('/idée',ideaRouter);

module.exports = app;