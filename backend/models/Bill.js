const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  vendor: { type: String, required: true },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  warrantyPeriod: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  billImage: { type: String, required: true },
  category: { type: String, default: 'Electronics' }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);