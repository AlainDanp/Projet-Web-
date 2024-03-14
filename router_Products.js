const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configuration de Multer pour spécifier le dossier de destination et le nom de fichier
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Image/Produits');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Création de l'instance Multer avec la configuration
const upload = multer({ storage: storage });

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


// Route pour ajouter un produit avec une image
router.post('/ajouter', upload.single('image'), (req, res, next) => {
  const { nom, prix, description, nom_categorie, Quantite } = req.body;

  if (!req.file) {
    res.status(400).json({ message: 'Aucun fichier image n\'a été envoyé' });
    return;
  }

  const imageUrl = req.file.path;

  connection.query('CALL ajoutProduit(?, ?, ?, ?, ?, ?)', [nom, prix, description, imageUrl, nom_categorie, Quantite], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ message: 'Produit ajouté avec succès' });
  });
});

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



module.exports = router;