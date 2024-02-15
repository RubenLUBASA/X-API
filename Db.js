const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// Tester la connexion à la base de données
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

testConnection();

const User = require('./models/User');

// Créer un nouvel utilisateur
User.create({
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice.smith@example.com'
});
// lire
const users = await User.findAll();
console.log(users);
//mettre à jour
await User.update({ firstName: 'Bob' }, { where: { id: 1 } });
//supprimer
await User.destroy({ where: { id: 2 } });