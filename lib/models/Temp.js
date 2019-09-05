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
}, {
  timestamps: true
});

tempSchema.statics.averageTemp = function() {
  return this.aggregate([
    { $group: { _id: '$null', AverageTemp: { $avg: '$temperature' } } },
    { $project: { _id: false } }
  ]);
};

module.exports = mongoose.model('Temp', tempSchema);
