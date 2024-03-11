const express = require('express');
const router = express.Router();

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

      // Stockage des informations de l'utilisateur dans la session
      req.session.user = {
        id_utilisateur: utilisateur.id_utilisateur,
        pseudo: utilisateur.pseudo,
      };

      // Définition de l'expiration de la session après 1 heure
      req.session.cookie.expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 heure

      res.json({ message: 'Authentification réussie' });
    } else {
      // Authentification échouée
      res.json({ message: 'Authentification échouée' });
    }
  });
});

// Route pour la déconnexion de l'utilisateur
router.post('/logout', (req, res, next) => {
  // Suppression de la session utilisateur
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ message: 'Déconnexion réussie' });
  });
});

module.exports = router;