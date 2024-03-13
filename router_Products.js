const express = require('express');


const router = express.Router();


// Route pour afficher tous les produits
router.get('/all', (req, res, next) => {
  connection.query('SELECT * FROM produits', (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ produits: rows });
  });
});

// Route pour afficher les produits par catégorie
router.get('/categorie/:nom_categorie', (req, res, next) => {
  const { nom_categorie } = req.params;
  connection.query('SELECT * FROM produits WHERE nom_categorie = ?', [nom_categorie], (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ produits: rows });
  });
});

// Route pour ajouter un produit
router.post('/ajouter', (req, res, next) => {
  const { nom, prix, description, image, nom_categorie,Quantite } = req.body;
  connection.query('CALL ajoutProduit(?, ?, ?, ?, ?, ?)', [nom, prix, description, image,nom_categorie, Quantite ], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ message: 'Produit ajouté avec succès' });
  });
})

// Route pour afficher la quantité totale de produits par catégorie
router.get('/quantite-par-categorie', (req, res, next) => {
  connection.query('SELECT nom_categorie, SUM(quantite) AS quantite_totale FROM produits GROUP BY nom_categorie', (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ quantites: rows });
  });
});

// Route pour afficher l'image d'un utilisateur par son ID
router.get('/utilisateur/:id/image', (req, res, next) => {
  const userId = req.params.id;
  connection.query('SELECT image FROM utilisateurs WHERE id = ?', [userId], (err, results) => {
    if (err) {
      next(err);
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    const imageUrl = results[0].image;
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageUrl);
  });
});

module.exports = router;