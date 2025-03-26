const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change si nécessaire
    password: '', // Mettre ton mot de passe si tu en as un
    database: 'db_test'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Route pour récupérer le professeur du jour
app.get('/professeur-du-jour', (req, res) => {
    const query = "SELECT * FROM professeurs ORDER BY RAND() LIMIT 1"; // Sélectionne un prof au hasard
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});

// Route pour la recherche
app.get('/search', (req, res) => {
    const query = req.query.q;
    const sql = `
      SELECT * FROM professeurs
      WHERE prenom LIKE ? OR nom LIKE ?
    `;
    db.query(sql, [`${query}%`, `${query}%`], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
});


app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});
