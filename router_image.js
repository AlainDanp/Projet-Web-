const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Configuration de Multer pour spécifier le dossier de destination et le nom de fichier
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Image');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Création de l'instance Multer avec la configuration
const upload = multer({ storage: storage });

// Route pour télécharger plusieurs images et les ajouter à la table "image_event"
router.post('/ajouter-images', upload.array('images', 10), (req, res, next) => {
    const { id_utilisateur, id_Evenements } = req.body;
    const cheminsAcces = req.files.map(file => file.path);

    const insertQueries = cheminsAcces.map(cheminAcces => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO image_events (chemin_acces, id_utilisateur, id_Evenements) VALUES (?, ?, ?)', [cheminAcces, id_utilisateur, id_Evenements], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });

    Promise.all(insertQueries)
        .then(() => {
            res.json({ message: 'Images ajoutées avec succès trop fort' });
        })
        .catch(err => {
            next(err);
        });
});

// Route pour afficher une image à partir de la base de données
router.get('/afficher-image/:id', (req, res, next) => {
    const imageId = req.params.id;

    connection.query('SELECT chemin_acces FROM image_events WHERE id = ?', [imageId], (err, rows) => {
        if (err) {
            next(err);
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ message: 'Image non trouvée' });
            return;
        }

        const cheminAcces = rows[0].chemin_acces;
        const imagePath = path.join(__dirname, cheminAcces);

        res.sendFile(imagePath);
    });
});

// Route pour supprimer une image de la base de données
router.delete('/supprimer-image/:id', (req, res, next) => {
    const imageId = req.params.id;

    connection.query('SELECT chemin_acces FROM image_events WHERE id = ?', [imageId], (err, rows) => {
        if (err) {
            next(err);
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ message: 'Image non trouvée' });
            return;
        }

        const cheminAcces = rows[0].chemin_acces;

        connection.query('DELETE FROM image_events WHERE id = ?', [imageId], (err, result) => {
            if (err) {
                next(err);
                return;
            }

            // Supprimer le fichier d'image du système de fichiers
            fs.unlink(cheminAcces, (err) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({ message: 'Image supprimée avec succès' });
            });
        });
    });
});

module.exports = router;