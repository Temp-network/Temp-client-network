const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
  monitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Monitor',
    required: true
  },
  temperature: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Temp', tempSchema);
