const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change si nécessaire
    password: '', // Mettre ton mot de passe si tu en as un
    database: 'polytechdle'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Route pour récupérer le professeur du jour
app.get("/professeur-du-jour/:mode", (req, res) => {
    const { mode } = req.params;
    const today = new Date().toISOString().split('T')[0];

    db.query(
        `SELECT p.* FROM professeurs_du_jour pdj 
         JOIN professeurs p ON pdj.professeur_id = p.id 
         WHERE pdj.date = ? AND pdj.mode = ?`,
        [today, mode],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: "Erreur serveur" });
            } else if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: "Aucun professeur du jour trouvé." });
            }
        }
    );
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


function selectRandomProfesseurForMode(mode) {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT professeur_id FROM professeurs_du_jour 
             WHERE date = (SELECT MAX(date) FROM professeurs_du_jour WHERE mode = ?) AND mode = ?`,
            [mode, mode],
            (err, previous) => {
                if (err) return reject(err);

                const previousProfId = previous.length > 0 ? previous[0].professeur_id : null;
                const query = previousProfId
                    ? `SELECT id FROM professeurs WHERE id != ? ORDER BY RAND() LIMIT 1`
                    : `SELECT id FROM professeurs ORDER BY RAND() LIMIT 1`;

                db.query(query, previousProfId ? [previousProfId] : [], (err, results) => {
                    if (err) return reject(err);
                    if (results.length > 0) resolve(results[0].id);
                    else reject("Aucun professeur trouvé.");
                });
            }
        );
    });
}


async function updateDailyProfessors() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const modes = ["classic", "phd", "photo"];

    for (let mode of modes) {
        try {
            const profId = await selectRandomProfesseurForMode(mode);
            db.query(
                "INSERT INTO professeurs_du_jour (date, mode, professeur_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE professeur_id = ?",
                [today, mode, profId, profId],
                (err) => {
                    if (err) console.error("Erreur lors de l'insertion du professeur du jour:", err);
                    else console.log(`Professeur du jour sélectionné pour ${mode}.`);
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
}

// Exécuter tous les jours à minuit
cron.schedule("0 0 * * *", () => {
    console.log("Mise à jour des professeurs du jour...");
    updateDailyProfessors();
});

// Exécuter au lancement du serveur pour s'assurer qu'il y a un professeur du jour
updateDailyProfessors();