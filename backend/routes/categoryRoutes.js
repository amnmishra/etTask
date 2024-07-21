import express from 'express';
import { getCategories, addCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCategories).post(protect, addCategory);

export default router;
``
