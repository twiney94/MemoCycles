const Card = require('../../domain/model/CardSchema');

class MongoCardRepository {
  async add(cardData) {
    const card = new Card(cardData);
    await card.save();
    return card;
  }

  async getAll() {
    return await Card.find();
  }

  async findByNextReviewDate(date) {
    return await Card.find({ nextReviewDate: { $lte: date } });
  }
}
module.exports = MongoCardRepository;
