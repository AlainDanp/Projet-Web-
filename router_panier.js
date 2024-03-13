const express = require('express');
const router = express.Router();



// Route pour ajouter un produit au panier
router.post('/ajouter-au-panier', (req, res, next) => {
    const { id_utilisateur, id_produit, quantite, prix,status } = req.body;
    console.log(id_produit);
    console.log(id_utilisateur);
    console.log(quantite);
    console.log( prix);
    console.log(status);
    connection.query('CALL ajoutPanier(?, ?, ?, ?, ?)', [prix, quantite, id_utilisateur, id_produit, status], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ message: 'Produit ajouté au panier avec succès,trop fort' });
    });
});

// Route pour valider le panier
router.post('/valider-panier', (req, res, next) => {
    const id_utilisateur = req.body.id_utilisateur;

    connection.query('SELECT u.pseudo, p.nom FROM panier AS pa INNER JOIN produits AS p ON pa.id_produit = p.id INNER JOIN utilisateurs AS u ON pa.id_utilisateur = u.id WHERE pa.id_utilisateur = ? AND pa.status = 0', [id_utilisateur], (err, rows) => {
        if (err) {
            next(err);
            return;
        }

        const panier = rows.map((row) => ({
            pseudo: row.pseudo,
            nom_produit: row.nom
        }));

        connection.query('UPDATE panier SET status = 1 WHERE id_utilisateur = ? AND status = 0', [id_utilisateur], (err, result) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ message: 'Panier validé avec succès', panier });
        });
    });
});

// Route pour afficher le panier d'un utilisateur
router.get('/afficher_panier/:id_utilisateur', ( req, res, next) => {
    const id_utilisateur = req.params.id_utilisateur;
    connection.query('SELECT p.*, u.pseudo, pr.nom AS nom_produit FROM panier AS p INNER JOIN utilisateurs AS u ON p.id_utilisateur = u.id INNER JOIN produits AS pr ON p.id_produit = pr.id WHERE p.id_utilisateur = ?', [id_utilisateur], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ panier: rows });
    });
});

// Route pour supprimer un produit du panier
router.delete('/delete_panier/:id_utilisateur/:id_produit', (req, res, next) => {
    const id_utilisateur = req.params.id_utilisateur;
    const id_produit = req.params.id_produit;

    connection.query('DELETE FROM panier WHERE id_utilisateur = ? AND id_produit = ?', [id_utilisateur, id_produit], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ message: 'Produit supprimé du panier avec succès' });
    });
});

module.exports = router;