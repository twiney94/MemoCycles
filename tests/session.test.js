const request = require('supertest');
const app = require('../infrastructure/web/server');
const Session = require('../domain/model/SessionSchema');
const { setupDatabase, userOne, userOneId } = require('../tests/fixtures/db');
const jwt = require('jsonwebtoken');

beforeEach(setupDatabase);

describe('Session API', () => {
  let authToken;

  beforeAll(() => {
    authToken = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET);
  });


  it('should create a new learning session', async () => {
    console.log("token is: ", authToken);

    const response = await request(app)
      .post('/sessions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        categories: ['Math', 'Science'],
        duration: 60
      })
      .expect(201);

    const session = await Session.findById(response.body._id);
    expect(session).not.toBeNull();
    expect(session.categories).toEqual(['Math', 'Science']);
    expect(session.duration).toEqual(60);
  });

  it('should retrieve user sessions', async () => {
    await request(app)
      .get('/sessions')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].userId.toString()).toEqual(userOneId.toString());
      });
  }, 10000);
});
