const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoCardRepository = require('../persistence/MongoCardRepository');
const GetCardsForReview = require('../../application/use_case/GetCardsForReview');
const User = require('../../domain/model/UserSchema');
const jwt = require('jsonwebtoken');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { find } = require('../../domain/model/SessionSchema');
const Session = require('../../domain/model/SessionSchema');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(feedbackRoutes);

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/memocycles';
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    if (process.env.NODE_ENV !== 'test') {
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    }
  })
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const cardRepository = new MongoCardRepository();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const auth = require('./middleware/Auth');
const Card = require('../../domain/model/CardSchema');

app.post('/cards', auth, async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send;
  }
});

app.get('/cards', auth, (req, res) => {
  const cards = cardRepository.getAll();
  res.status(200).send(cards);
});

app.get('/cards/review', auth, (req, res) => {
  const getCardsForReviewUseCase = new GetCardsForReview(cardRepository);
  const today = new Date();
  const cards = getCardsForReviewUseCase.execute(today);
  res.status(200).send(cards);
});

app.post('/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .send({ user: { username: user.username, email: user.email }, token });
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
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET
    );
    res.send({ token });
  } catch (error) {
    res.status(400).send('Unable to login');
  }
});

app.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id });
    res.send(sessions);
  } catch (error) {
    console.log(error);
    console.log(req);
    res.status(500).send();
  }
});

app.post('/sessions', auth, async (req, res) => {
  try {
    const session = new Session({ ...req.body, userId: req.user._id });
    await session.save();
    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

//create a get route /cards/quizz with a date in optional parameter

app.get('/cards/quizz:date', auth, async (req, res) => {
  try {
    const date = req.params.date || new Date();
    const newDate = new Date(date);
    const cards = await Card.find({ userId: req.user._id, newDate });
    res.send(cards);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = app;
