// backend/models/Query.js
const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  symptoms: String,
  result: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Query', querySchema);

