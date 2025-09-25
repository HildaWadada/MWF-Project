const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
    type: {
    type: String,
    required: true,
  },
    supplier: {
    type: String,
    required: true,
  },
    quantity: {
    type: Number,
    required: true,
  },
    cost: {
    type: Number,
    required: true,
  },
    price: {
    type: Number,
    required: true,
  },
    quality: {
    type: String,
    required: true,
  },

    lastUpdate: {
    type: Date,
    default: Date.now },
});

module.exports = mongoose.model('stockModel', stockSchema);