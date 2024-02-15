// Configurer la connexion à la base de données PostgreSQL avec Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nom_de_votre_base_de_donnees', 'nom_utilisateur', 'mot_de_passe', {
    host: 'localhost',
    dialect: 'postgres'
});

//Créer un modèle utilisateur avec Sequelize 
const { DataTypes } = require('sequelize');
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//Créer un middleware pour vérifier les jetons JWT 
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token non fourni.' });
    }
    jwt.verify(token, 'votre_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Échec de l\'authentification du token.' });
        }
        req.user = decoded;
        next();
    });
};
module.exports = verifyToken;

//Générer un jeton JWT lors de l'authentification réussie

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, 'votre_secret_key', { expiresIn: '1h' });
};

module.exports = generateToken;

