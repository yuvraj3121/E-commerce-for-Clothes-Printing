const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  image: String, // Cloudinary URL
  description: String,
  sizes: [String], // e.g., ['S', 'M', 'L', 'XL']
  colors: [String], // e.g., ['black', 'white']
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
