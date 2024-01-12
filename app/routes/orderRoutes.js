import express from 'express';
import { createOrder, getOrderById, getOrdersByUserId, updateOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getOrderById);
router.get('/user/:userId', getOrdersByUserId);
router.put('/:id', updateOrder);

export default router;