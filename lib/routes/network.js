const { Router } = require('express');

module.exports = Router()
  .get('/status', (req, res) => {
    res.status(204);
    res.end();
  });
