import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import { createCategoryPayloadSchema } from '../validator/schema.js';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from '../controller/category-controller.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories',authenticateToken, validate(createCategoryPayloadSchema), createCategory);
router.put('/categories/:id', authenticateToken, updateCategoryById);
router.delete('/categories/:id', authenticateToken, deleteCategoryById);

export default router;