const request = require('supertest');
const app = require('../infrastructure/web/server');
const Session = require('../domain/model/SessionSchema');
const { setupDatabase, userOne, userOneId } = require('../tests/fixtures/db');

beforeEach(setupDatabase);

describe('Session API', () => {
  it('should create a new learning session', async () => {
    const response = await request(app)
      .post('/sessions')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        categories: ['Math', 'Science'],
        duration: 60
      })
      .expect(201);

    // Vérifier que la session est sauvegardée dans la base de données
    const session = await Session.findById(response.body._id);
    expect(session).not.toBeNull();
    expect(session.categories).toEqual(['Math', 'Science']);
    expect(session.duration).toEqual(60);
  }, 10000);

  it('should retrieve user sessions', async () => {
    await request(app)
      .get('/sessions')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)
      .then((response) => {
        // Assurez-vous que la réponse contient les sessions attendues
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].userId).toEqual(userOneId);
      });
  }, 10000);
});