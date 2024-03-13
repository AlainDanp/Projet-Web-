const express = require('express');
const session = require('express-session');

const { connects } = require('./dbConnection');
const produitsRouter = require('./router_Products');
const connexionRouter = require('./router_connexion');
const ideaRouter = require('./router_idée');
const eventsRouter = require('./router_evenements');
const panierRouter = require('./router_panier');
const imageRouter = require('./router_image'); // Ajoutez cette ligne avec le chemin réel de votre fichier de routeur d'images

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
app.use('/evenements',eventsRouter);
app.use('/panier',panierRouter);
app.use('/idee',ideaRouter);

// Utilisation du routeur pour les images
app.use('/images', imageRouter);

module.exports = app;