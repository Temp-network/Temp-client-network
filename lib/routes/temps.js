const { Router } = require('express');
const Temp = require('../models/Temp');

module.exports = Router()
  .get('/', (req, res, next) => {
    Temp
      .find()
      .then(temps => res.send(temps))
      .catch(next);
  })
  
  .get('/average', (req, res, next) => {
    Temp
      .averageTemp()
      .then(temp => res.send(temp[0]))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Temp  
      .find({ monitorId: req.params.id })
      .sort({ createdAt: 1 })
      .limit(10)
      .then(temps => res.send(temps))
      .catch(next);
  });
