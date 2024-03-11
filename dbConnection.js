const mysql = require('mysql2');

// Configuration de la connexion à la base de données
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projet'
  };
  
exports.connects = () => {
  
      // Création de la connexion à la base de données
      connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'projet'
      });
      
      // Connexion à la base de données
      connection.connect((err) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données:', err);
          process.exit(1);
        }
        console.log('Connecté à la base de données MySQL.');
      });
  
      return connection;
  }
  