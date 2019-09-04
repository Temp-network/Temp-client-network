const { Router } = require('express')
const Monitor = require('../models/Monitors');

module.exports = Router()
  .get('/', (req, res, next) => {
    Monitor
      .find()
      .then(monitor => res.send(monitor))
      .catch(next);
  })
  
