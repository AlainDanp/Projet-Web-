const express = require('express');
const router = express.Router();
const {createToken, verifyToken} = require("./token");

// Route pour l'authentification de l'utilisateur
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Vérification de l'authentification dans la base de données
  connection.query('SELECT * FROM utilisateurs WHERE email = ? AND password = ?', [email, password], (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }

    if (rows.length === 1) {

      // Authentification réussie

      // Récupération des informations de l'utilisateur
      const utilisateur = rows[0];

      // Appel de la fonction createToken pour générer le token
      const token = createToken(req, res, () => {
      });
      // Renvoyer le token dans la réponse
      res.json({ token: token });
    } else {
      // Authentification échouée
      res.json({ message: 'Authentification échouée' });
    }
  });
});

// Route pour la déconnexion de l'utilisateur
router.post('/logout', verifyToken, (req, res, next) => {
  // Invalidating the token
  req.token = null;
  res.json({ message: 'Déconnexion réussie' });
});

module.exports = router;