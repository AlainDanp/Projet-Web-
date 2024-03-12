const express = require('express');
const moment = require('moment');
const router = express.Router();

// Route pour afficher tous les événements
router.get('/all', (req, res, next) => {
    connection.query('SELECT * FROM evenements', (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }

        const formattedRows = rows.map(row => {
            return {
                ...row,
                date_debut: formatDate(row.date_debut),
                date_fin: formatDate(row.date_fin)
            };
        });

        res.json({ evenements: formattedRows });
    });
});

// Route pour afficher un événement spécifique par son nom
router.get('/nom/:nom', (req, res, next) => {
    const eventName = req.params.nom;
    connection.query('SELECT * FROM evenements WHERE nom = ?', [eventName], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        if (rows.length === 0) {
            res.status(404).json({ message: 'Événement non trouvé' });
            return;
        }

        const formattedEvent = {
            ...rows[0],
            date_debut: formatDate(rows[0].date_debut),
            date_fin: formatDate(rows[0].date_fin)
        };

        res.json({ evenement: formattedEvent });
    });
});

// Route pour afficher tous les événements entre deux dates
router.get('/dates/:dateDebut/:dateFin', (req, res, next) => {
    const { dateDebut, dateFin } = req.params;
    connection.query('SELECT * FROM evenements WHERE date_debut >= ? AND date_fin <= ?', [dateDebut, dateFin], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }

        const formattedRows = rows.map(row => {
            return {
                ...row,
                date_debut: formatDate(row.date_debut),
                date_fin: formatDate(row.date_fin)
            };
        });

        res.json({ evenements: formattedRows });
    });
});

// Route pour vérifier et mettre à jour le statut des événements dont la date de fin est passée
router.put('/expiration', (req, res, next) => {
    const currentDate = moment().format('YYYY-MM-DD'); // Date actuelle au format 'YYYY-MM-DD'
    connection.query('UPDATE evenements SET status = 1 WHERE date_fin < ? AND status = 0', [currentDate], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ message: 'Statut des événements mis à jour avec succès' });
    });
});

// Route pour ajouter un événement
router.post('/ajouter', (req, res, next) => {
    const { nom, description, date_debut, date_fin } = req.body;
    const evenement = {
        nom,
        description,
        date_debut: formatDate(date_debut),
        date_fin: formatDate(date_fin)
    };

    connection.query('INSERT INTO evenements SET ?', evenement, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ message: 'Événement ajouté avec succès,trop fort' });
    });
});

// Fonction pour formater la date au format 'YYYY-MM-DD'
function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}

module.exports = router;