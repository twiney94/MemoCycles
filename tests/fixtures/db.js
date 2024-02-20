const mongoose = require('mongoose');
const User = require('../../domain/model/UserSchema');
const jwt = require('jsonwebtoken');

// Objets utilisateur pour les tests
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: 'testuser',
  email: 'test@example.com',
  password: '56what!!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, 'secretkey')
  }]
};


// Fonction pour initialiser la base de données
const setupDatabase = async () => {
  await User.deleteMany(); // Efface tous les utilisateurs
  await new User(userOne).save(); // Ajoute un utilisateur de test
};

module.exports = { setupDatabase, userOne, userOneId };