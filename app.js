// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Db');
const auth = require('./auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = auth.hashPassword(password);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
    res.json({ message: 'Inscription réussie' });
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (!row || !auth.comparePassword(password, row.password)) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const token = auth.generateToken(row.id);
    res.json({ token });
  });
});

app.post('/create-post', async (req, res) => {
  const { content } = req.body;
  const userId = auth.verifyToken(req.headers.authorization);

  if (!userId) {
    return res.status(401).json({ error: 'Token invalide' });
  }

  db.run('INSERT INTO posts (userId, content) VALUES (?, ?)', [userId, content], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la création de la publication' });
    }
    res.json({ message: 'Publication créée avec succès' });
  });
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
