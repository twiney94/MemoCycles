const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;