const express = require('express');
const Session = require('../../../domain/model/SessionSchema');
const router = express.Router();

router.post('/sessions', async (req, res) => {
  try {
    const session = new Session({ ...req.body, userId: req.user._id });
    await session.save();
    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id });
    res.send(sessions);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;