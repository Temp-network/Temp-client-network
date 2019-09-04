const express = require('express');
const app = express();

app.use(express.json());

app.use('/', require('./routes/network'));
app.use('/api/v1/monitors', require('./routes/monitors'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
