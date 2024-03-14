// Importer les modules nécessaires
const express = require('express');
const path = require('path');
const fs = require('fs');

// Créer une instance du routeur express
const router = express.Router();

// Route pour afficher l'image d'un utilisateur à partir de son pseudo
router.get('/afficher_image/:pseudo', (req, res, next) => {
    const pseudo = req.params.pseudo;

    const query = 'SELECT * FROM utilisateurs WHERE pseudo = ?';
    connection.query(query, [pseudo], (err, rows) => {
        if (err) {
            next(err);
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        const utilisateur = rows[0];
        const imagePath = path.join(__dirname,  utilisateur.image);

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                next(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'image/jpeg', // Remplacez par le type MIME approprié de votre image
                'Content-Length': data.length
            });
            res.end(data);
        });
    });
});

// Route pour supprimer un utilisateur
router.delete('/supprimer/:pseudo', (req, res, next) => {
    const pseudo = req.params.pseudo;

    const query = 'DELETE FROM utilisateurs WHERE pseudo = ?';
    connection.query(query, [pseudo], (err, result) => {
        if (err) {
            next(err);
            return;
        }

        res.json({ message: 'Utilisateur supprimé avec succès' });
    });
});

// Route pour changer le pseudo d'un utilisateur
router.put('/modifier/pseudo/:pseudo', (req, res, next) => {
    const pseudo = req.params.pseudo;
    const nouveauPseudo = req.body.nouveauPseudo;

    const query = 'UPDATE utilisateurs SET pseudo = ? WHERE pseudo = ?';
    connection.query(query, [nouveauPseudo, pseudo], (err, result) => {
        if (err) {
            next(err);
            return;
        }

        res.json({ message: 'Pseudo modifié avec succès' });
    });
});

// Exporter le routeur
module.exports = router;