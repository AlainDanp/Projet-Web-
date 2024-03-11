const express = require('express');
const { connects } = require('./dbConnection');
const session = require('express-session');

const app = express();
const connection = connects();

// Configuration de la session
app.use(
  session({
    secret: 'mySecretKey', // Clé secrète pour signer les cookies de session
    resave: false,
    saveUninitialized: true
  })
);

const usersRouter = express.Router();

// Gestion de la requête POST sur l'URL /login (connexion de l'utilisateur)
usersRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérification des informations d'identification de l'utilisateur dans la base de données
  const query = 'SELECT * FROM utilisateurs WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length > 0) {
      // Informations d'identification valides, créer une session et stocker le pseudo
      const pseudo = results[0].pseudo;
      req.session.pseudo = pseudo;
      res.send('Connexion réussie');
    } else {
      res.send('Informations d\'identification invalides');
    }
  });
});

// Gestion de la requête GET sur l'URL /profile (afficher le profil de l'utilisateur connecté)
usersRouter.get('/profile', (req, res) => {
  if (req.session.pseudo) {
    // Utilisateur connecté, afficher le profil
    const pseudo = req.session.pseudo;
    res.send(`Profil de l'utilisateur ${pseudo}`);
  } else {
    res.send('Utilisateur non connecté');
  }
});

// Gestion de la requête POST sur l'URL /logout (déconnexion de l'utilisateur)
usersRouter.post('/logout', (req, res) => {
  req.session.destroy(); // Supprimer la session
  res.send('Déconnexion réussie');
});

app.use('/users', usersRouter);

module.exports = app;