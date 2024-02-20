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
};


const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = { setupDatabase, userOne, userOneId };