const MongoCardRepository = require('../../../infrastructure/persistence/MongoCardRepository');
const Card = require('../../../domain/model/CardSchema');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('MongoCardRepository', () => {
    let mongoServer;
    let cardRepository;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        cardRepository = new MongoCardRepository();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        if (mongoServer)
            await mongoServer.stop();
    });

    it('should add a card and find it by next review date', async () => {
        const cardData = { question: 'Test?', answer: 'Test answer', box: 1, nextReviewDate: new Date() };
        const savedCard = await cardRepository.add(cardData);
        expect(savedCard.question).toBe('Test?');

        const cards = await cardRepository.findByNextReviewDate(new Date());
        expect(cards.length).toBeGreaterThan(0);
    });
});
