// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importer la configuration de Sequelize

const User = sequelize.define('User', {
  // Définir les champs du modèle User
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = User;

// app.js
const User = require('./models/User');

// Utilisation du modèle User
User.create({
  prénom: 'Ruben',
  nom: 'LUBASA',
  email: 'rubenlubasa44@gmail.com'
});