import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);

export default router;