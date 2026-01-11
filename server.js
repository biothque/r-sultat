const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Permet à votre page web de parler à l'API
app.use(express.json());

// CONFIGURATION : Remplacez par vos vrais accès cPanel
const db = mysql.createConnection({
    host: 'localhost',
    user: 'VOTRE_UTILISATEUR_MYSQL', 
    password: 'VOTRE_MOT_DE_PASSE_MYSQL',
    database: 'VOTRE_NOM_DE_BASE_DE_DONNEES'
});

// ROUTE DE RECHERCHE
app.get('/api/resultats/:matricule', (req, res) => {
    const matricule = req.params.matricule;
    const sql = "SELECT * FROM eleves WHERE matricule = ?";

    db.query(sql, [matricule], (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur SQL" });
        
        if (results.length > 0) {
            const eleve = results[0];

            // CONDITION FINANCES (Ce que vous avez demandé)
            // Si la colonne 'finances' n'est pas 'ok', on bloque l'envoi des points
            if (eleve.finances.toLowerCase() !== 'ok') {
                return res.status(403).json({ 
                    message: "Veuillez régulariser vos frais académiques." 
                });
            }

            // Si OK, on envoie tout l'objet (dynamique : toutes les colonnes)
            res.json(eleve);
        } else {
            res.status(404).json({ message: "Matricule non trouvé." });
        }
    });
});

app.listen(3000, () => console.log("API lancée sur le port 3000"));
