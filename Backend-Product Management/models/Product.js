const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
