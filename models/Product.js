const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true, default: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  // status derived from quantity but stored for convenience
  status: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' }
}, { timestamps: true });

productSchema.pre('save', function (next) {
  this.status = this.quantity > 0 ? 'In Stock' : 'Out of Stock';
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.quantity !== undefined) {
    update.status = update.quantity > 0 ? 'In Stock' : 'Out of Stock';
    this.setUpdate(update);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
