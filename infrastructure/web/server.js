const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoCardRepository = require('../persistence/MongoCardRepository');
const AddCard = require('../../application/use_case/AddCard');
const GetCardsForReview = require('../../application/use_case/GetCardsForReview');
const User = require('../../domain/model/UserSchema');
const jwt = require('jsonwebtoken');
const feedbackRoutes = require('./routes/feedbackRoutes');
const {find} = require("../../domain/model/SessionSchema");
const Session = require("../../domain/model/SessionSchema");
const app = express();

const mongoUsername = encodeURIComponent('root');
const mongoPassword = encodeURIComponent('password');
const mongoHost = 'localhost';
const mongoPort = '27018'; // Le port exposé sur votre hôte local
const mongoDatabase = 'learning_cards';

const mongoUri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connexion à MongoDB réussie.'))
  .catch((err) => console.error('Impossible de se connecter à MongoDB.', err));

const port = 3000;
app.use(bodyParser.json());
app.use(feedbackRoutes);

const cardRepository = new MongoCardRepository();

app.post('/cards', (req, res) => {
  const addCardUseCase = new AddCard(cardRepository);
  const card = addCardUseCase.execute(req.body);
  res.status(201).send(card);
});

app.get('/cards/review', (req, res) => {
  const getCardsForReviewUseCase = new GetCardsForReview(cardRepository);
  const today = new Date(); // Simplement pour l'exemple, ajustez selon la logique de votre application
  const cards = getCardsForReviewUseCase.execute(today);
  res.status(200).send(cards);
});

app.post('/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password))) {
      throw new Error();
    }
    const token = jwt.sign({ _id: user._id.toString() }, 'secretkey');
    res.send({ user, token });
  } catch (error) {
    res.status(400).send('Unable to login');
  }
});

app.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.findO;
    res.send(sessions);
  } catch (error) {
    console.log(error);
    console.log(req);
    res.status(500).send();
  }
});
app.post('/sessions', async (req, res) => {
  try {
    const session = new Session({ ...req.body, userId: req.user._id });
    await session.save();
    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);

module.exports = app;

  if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });
}
