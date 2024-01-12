import express from 'express';
import { createUser, loginUser, getUserById, updateUser } from '../controllers/userController.js'

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router;