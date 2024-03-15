const express = require('express');
const session = require('express-session');

const { connects } = require('./dbConnection');
const produitsRouter = require('./router_Products');
const connexionRouter = require('./router_connexion');
const ideaRouter = require('./router_idée');
const eventsRouter = require('./router_evenements');
const panierRouter = require('./router_panier');
const imageRouter = require('./router_image'); // Ajoutez cette ligne avec le chemin réel de votre fichier de routeur d'images
const usersRouter = require('./router_users');
const likeRouter = require('./router_like');
const {verifyToken} = require("./token");

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
app.use('/produits',verifyToken, produitsRouter);
app.use('/connexion',connexionRouter);
app.use('/evenements',verifyToken,eventsRouter);
app.use('/panier',verifyToken,panierRouter);
app.use('/idee',verifyToken,ideaRouter);
app.use('/users',verifyToken,usersRouter);
app.use('/likes',verifyToken,likeRouter);

// Utilisation du routeur pour les images
app.use('/images',verifyToken, imageRouter);


module.exports = app;