class GetCardsForReview {
    constructor(cardRepository) {
      this.cardRepository = cardRepository;
    }
  
    execute(date) {
      return this.cardRepository.findByNextReviewDate(date);
    }
  }
  module.exports = GetCardsForReview;
  