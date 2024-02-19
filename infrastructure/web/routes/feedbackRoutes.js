const express = require('express');
const router = express.Router();
const Feedback = require('../../../domain/model/FeedbackSchema');

router.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;