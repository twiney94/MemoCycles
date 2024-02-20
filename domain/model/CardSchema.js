const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  box: Number,
  nextReviewDate: Date,
});

cardSchema.methods.adjustReviewDate = function (success) {
  if (success) {
    this.box++;
    this.nextReviewDate = new Date(Date.now() + this.box * 24 * 60 * 60 * 1000);
  } else {
    this.box = 1;
    this.nextReviewDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }
};

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
