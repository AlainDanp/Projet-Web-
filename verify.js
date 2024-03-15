const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Middleware pour vérifier le token et gérer les autorisations
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, req.secretKey);

        // Ajouter les informations de l'utilisateur à l'objet de requête pour une utilisation ultérieure
        req.user = decoded;

        // Vérifier les autorisations basées sur le rôle de l'utilisateur
        if (decoded.statut !== '1') {
            return res.status(403).json({ message: 'Accès interdit. Autorisation insuffisante.' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
    }
}