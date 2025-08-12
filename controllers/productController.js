const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, lowStockThreshold } = req.body;
    if (!name || !category) return res.status(400).json({ message: 'Name and category required' });

    const product = await Product.create({ name, category, price: price || 0, quantity: quantity || 0, lowStockThreshold });
    return res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all products with optional filters: category, status, search, sort
exports.getProducts = async (req, res) => {
  try {
    const { category, status, search, sortBy } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) filter.name = { $regex: search, $options: 'i' };

    let query = Product.find(filter);
    if (sortBy === 'name') query = query.sort({ name: 1 });
    if (sortBy === 'price') query = query.sort({ price: 1 });

    const products = await query.exec();

    // Stats
    const totalItems = products.length;
    const lowStockItems = products.filter(p => p.quantity <= (p.lowStockThreshold || 5)).length;
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);

    return res.json({ products, meta: { totalItems, lowStockItems, totalInventoryValue } });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const product = await Product.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};