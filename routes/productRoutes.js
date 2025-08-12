const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Protect these routes
router.use(auth);

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
