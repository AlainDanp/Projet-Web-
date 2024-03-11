const express = require('express');
const router = express.Router();

// Route pour afficher une image à partir de la base de données
router.get('/image/:id', (req, res, next) => {
    const imageId = req.params.id;

    // Récupération de l'image à partir de la base de données en fonction de l'ID
    connection.query('SELECT image_data FROM images WHERE id = ?', [imageId], (err, results) => {
        if (err) {
            next(err);
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Image non trouvée' });
            return;
        }

        // Renvoi de l'image en tant que réponse avec le bon type de contenu
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(results[0].image_data);
    });
});

module.exports = router;