const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  cardNumber: { type: String, required: true },
  name: { type: String, required: true },
  functions: { type: [String], required: true },
  variant: { type: String, required: true }
});

module.exports = mongoose.model('Card', cardSchema);
