const Card = require('../../../domain/model/Card');

describe('Card entity', () => {
  it('should create a card with question, answer, box, and nextReviewDate', () => {
    const card = new Card(null, 'What is Node.js?', 'Node.js is a JavaScript runtime', 1, new Date());
    expect(card.question).toBe('What is Node.js?');
    expect(card.answer).toBe('Node.js is a JavaScript runtime');
    expect(card.box).toBe(1);
    expect(card.nextReviewDate).toBeDefined();
  });
});
