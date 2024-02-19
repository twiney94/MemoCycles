class InMemoryCardRepository {
    constructor() {
      this.cards = [];
    }
  
    add(card) {
      card.id = this.cards.length + 1;
      this.cards.push(card);
      return card;
    }
  
    findByNextReviewDate(date) {
      return this.cards.filter(card => card.nextReviewDate <= date);
    }
  }
  module.exports = InMemoryCardRepository;
  