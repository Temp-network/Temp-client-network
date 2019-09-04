const { Router } = require('express');
const Monitor = require('../models/Monitors');
const Temp = require('../models/Temp');

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
  })

  .post('/temp/:id', (req, res, next) => {
    const temperature = req.body.temperature;
    Monitor
      .findById(req.params.id)
      .then(monitor => {
        Temp  
          .create({ temperature, monitorId: monitor._id })
          .then(temp => res.send(temp))
          .catch(next);
      });
  });
