const express = require('express');
const { createProduct, getProducts, getProductById } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createProduct);     // Admin only, optionally add role check
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
