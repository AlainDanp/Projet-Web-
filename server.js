const http = require('http');
const app = require('./app');
// Fonction pour obtenir un port valide
function getValidPort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // Nom de canal nommé
    return val;
  }

  if (port >= 0) {
    // Numéro de port
    return port;
  }

  return false;
}



const server = http.createServer(app);

const port = getValidPort(process.env.PORT || '3000');

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

// Gestion des erreurs
server.on('error', (error) => {
  console.error('Erreur de serveur:', error);
});

// Gestion des exceptions non capturées
process.on('uncaughtException', (error) => {
  console.error('Exception non capturée:', error);
  // Ferme la connexion à la base de données
  connection.end();
  server.close(() => {
    process.exit(1);
  });
});

// Gestion des exceptions de promesses non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesse rejetée:', reason);
  // Ferme la connexion à la base de données
  connection.end();
  server.close(() => {
    process.exit(1);
  });
});
