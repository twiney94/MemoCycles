const request = require('supertest');
const app = require('../../../infrastructure/web/server');
const User = require('../../../domain/model/UserSchema');
const jwt = require('jsonwebtoken');
const { setupDatabase, userOneId } = require('../../fixtures/db');

beforeEach(setupDatabase);

describe('Card API', () => {
  let authToken;

  beforeAll(() => {
    authToken = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET);
  });

  it('should allow creating a new card with valid token', async () => {
    const cardData = { question: 'What is Node.js?', answer: 'Node.js is a JavaScript runtime', box: 1, nextReviewDate: new Date() };
    const response = await request(app)
      .post('/cards')
      .set('Authorization', `Bearer ${authToken}`)
      .send(cardData);
    expect(response.statusCode).toBe(201);
    expect(response.body.question).toBe(cardData.question);
  });
});
