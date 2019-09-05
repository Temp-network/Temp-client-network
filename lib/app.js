const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/', require('./routes/network'));
app.use('/api/v1/monitors', require('./routes/monitors'));
app.use('/api/v1/temps', require('./routes/temps'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
