const express = require('express');
const router = express.Router();

// Route pour enregistrer une nouvelle idée
router.post('/nouvelle-idee', (req, res, next) => {
    const { nom, description } = req.body;
    const pseudo = req.session.user.pseudo;

    // Insertion de l'idée dans la base de données
    connection.query('INSERT INTO boite_idee (nom, description, pseudo) VALUES (?, ?, ?)', [nom, description, pseudo], (err, result) => {
        if (err) {
            next(err);
            return;
        }

        res.json({ message: 'Idée enregistrée avec succès' });
    });
});

// Route pour afficher les idées en fonction du pseudo entré par l'utilisateur
router.get('/idees-par-pseudo', (req, res, next) => {
    const pseudo = req.query.pseudo;

    // Récupération des idées de la base de données pour le pseudo spécifié
    connection.query('SELECT nom, description FROM boite_idee WHERE pseudo = ?', [pseudo], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }

        res.json({ idées: rows });
    });
});

module.exports = router;