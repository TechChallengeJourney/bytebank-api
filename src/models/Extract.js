const mongoose = require('mongoose');

const extractSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Extract', extractSchema);
