const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoCardRepository = require('../persistence/MongoCardRepository');
const AddCard = require('../../application/use_case/AddCard');
const GetCardsForReview = require('../../application/use_case/GetCardsForReview');

mongoose.connect('mongodb://localhost/learning_cards', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
