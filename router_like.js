// Importer les modules nécessaires
const express = require('express');
const router = express.Router();

// Route pour gérer le like
router.post('/like/:id_utilisateur/:id_event', (req, res, next) => {
    const idUtilisateur = req.params.id_utilisateur;
    const idEvent = req.params.id_event;

    // Vérifier si une ligne existe déjà dans la table "like" pour ces ID
    const queryCheck = 'SELECT * FROM `likes` WHERE id_utilisateur = ? AND id_events = ?';
    connection.query(queryCheck, [idUtilisateur, idEvent], (err, rows) => {
        if (err) {
            next(err);
            return;
        }

        if (rows.length === 0) {
            // Aucune ligne correspondante trouvée, ajouter une nouvelle ligne
            const queryInsert = 'INSERT INTO `likes` (id_utilisateur, id_events, statut) VALUES (?, ?, 0)';
            connection.query(queryInsert, [idUtilisateur, idEvent], (err, result) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({ message: 'Like ajouté avec succès', statut: false });
            });
        } else {
            // Une ligne correspondante existe, supprimer la ligne existante
            const queryDelete = 'DELETE FROM `likes` WHERE id_utilisateur = ? AND id_event = ?';
            connection.query(queryDelete, [idUtilisateur, idEvent], (err, result) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({ message: 'Like supprimé avec succès', statut: true });
            });
        }
    });
});

// Route pour afficher la somme des likes d'un événement spécifique
router.get('/likes_somme/:id_event', (req, res, next) => {
    const idEvent = req.params.id_event;

    const querySum = 'SELECT COUNT(*) AS somme_likes FROM `likes` WHERE id_event = ? AND statut = 1';
    connection.query(querySum, [idEvent], (err, rows) => {
        if (err) {
            next(err);
            return;
        }

        const sommeLikes = rows[0].somme_likes;
        res.json({ somme_likes: sommeLikes });
    });
});

// Route pour afficher tous les utilisateurs qui ont liké un événement spécifique
router.get('/likes_utilisateurs/:id_event', (req, res, next) => {
    const idEvent = req.params.id_event;

    const queryUsers = 'SELECT id_utilisateur FROM `likes` WHERE id_event = ?  GROUP BY id_event';
    connection.query(queryUsers, [idEvent], (err, rows) => {
        if (err) {
            next(err);
            return;
        }

        const utilisateurs = rows.map(row => row.id_utilisateur);
        res.json({ utilisateurs });
    });
});

// Exporter le routeur
module.exports = router;