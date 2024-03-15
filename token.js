const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Générer une clé aléatoire de longueur donnée



const random= "wilfried";

// Middleware de création du token
exports.createToken = (req, res, next) => {
    const { pseudo, email, statut } = req.body;

    // Créer un payload avec les informations de l'utilisateur
    const payload = {
        pseudo,
        email,
        statut
    };

    // Générer une nouvelle clé secrète
    const secretKey = random;

    // Générer le token avec la nouvelle clé secrète
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Ajouter le token à l'objet de requête pour une utilisation ultérieure
    req.token = token;

    // Ajouter la nouvelle clé secrète à l'objet de requête pour une utilisation ultérieure
    req.secretKey = secretKey;

    return token

    next();
}


exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, random);

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




