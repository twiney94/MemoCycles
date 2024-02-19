const Card = require('../../domain/model/Card');

class AddCard {
  constructor(cardRepository) {
    this.cardRepository = cardRepository;
  }

  execute(cardData) {
    const { question, answer } = cardData;
    const card = new Card(null, question, answer, 1, new Date());
    return this.cardRepository.add(card);
  }
}
module.exports = AddCard;
