const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cardsReviewedToday: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 }
});

const UserStats = mongoose.model('UserStats', userStatsSchema);

module.exports = UserStats;