const { Router } = require('express');
const Monitor = require('../models/Monitors');

module.exports = Router()
  .get('/status', (req, res) => {
    res.sendStatus(204);
  })

  .post('/register', (req, res, next) => {
    const { name } = req.body;
    Monitor
      .create({ name })
      .then(monitor => {
        res.send({ id: monitor._id });
      })
      .catch(next);
  })

  .delete('/deregister', (req, res, next) => {
    Monitor
      .findByIdAndDelete(req.body.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
  });
