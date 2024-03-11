const express = require('express');
const { connects } = require('./dbConnection');

const app = express();
const connection = connects();

const productsRouter = express.Router();

// Gestion de la requête GET sur l'URL /all (récupérer tous les produits)
productsRouter.get('/all', (req, res) => {
  connection.query('SELECT * FROM produits', (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Gestion de la requête POST sur l'URL /allByCat (récupérer les produits par catégorie)
productsRouter.post('/allByCat', (req, res) => {
  const { category } = req.body;
  console.log(category);

  // Utilisation de paramètres préparés pour éviter les failles d'injection SQL
  const query = 'SELECT * FROM produits WHERE nom_categorie = ?';
  connection.query(query, [category], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Gestion de la requête POST sur l'URL /add (ajouter un produit)
productsRouter.post('/add', (req, res) => {
  const { nom, prix, description, image, quantite, category } = req.body;

  // Utilisation de paramètres préparés pour éviter les failles d'injection SQL
  const query = 'INSERT INTO produits (nom, prix, description, image, quantite, nom_categorie) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [nom, prix, description, image, quantite, category], (error, results) => {
    if (error) {
      throw error;
    }
    res.send('Produit ajouté avec succès');
  });
});

// Gestion de la requête GET sur l'URL /quantityByCategory (afficher la quantité totale de produits par catégorie)
productsRouter.get('/quantityByCategory', (req, res) => {
  const query = 'SELECT nom_categorie, SUM(quantite) AS total_quantite FROM produits GROUP BY nom_categorie';
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    results.forEach((result) => {
      console.log(`La catégorie "${result.nom_categorie}" a une quantité totale de produits de ${result.total_quantite}`);
    });

    res.send(results);
  });
});

//TODO ajouter la fonctionnalité de décrémentation lors de l'achat d'un produit

app.use('/test', productsRouter);

module.exports = app;

""