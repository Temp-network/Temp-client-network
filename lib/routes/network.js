const { Router } = require('express');
const Monitor = require('../models/Monitors');

module.exports = Router()
  .get('/status', (req, res) => {
    res.status(204);
    res.end();
  })

  .post('/register', (req, res, next) => {
    const { name } = req.body;
    Monitor
      .create({ name })
      .then(monitor => {
        res.send({ id: monitor._id });
      })
      .catch(next);
  });
