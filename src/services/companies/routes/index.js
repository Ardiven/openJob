import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import { createCompanyPayloadSchema } from '../validator/schema.js';

import {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById
} from '../controller/company-controller.js';

const router = Router();

router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.post('/companies',authenticateToken, validate(createCompanyPayloadSchema), createCompany);
router.put('/companies/:id', authenticateToken, updateCompanyById);
router.delete('/companies/:id', authenticateToken, deleteCompanyById);

export default router;