import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import validate from "../../../middlewares/validate.js";
import { createApplicationPayloadSchema } from "../validator/schema.js";
import {
    getApplications,
    getApplicationById,
    getApplicationsByUserId,
    getApplicationsByJobId,
    applyJob,
    updateApplicationById,
    deleteApplicationById
} from "../controller/application-controller.js";

const router = Router();

router.get('/applications', authenticateToken, getApplications);
router.get('/applications/:id', authenticateToken, getApplicationById);
router.get('/applications/user/:id', authenticateToken, getApplicationsByUserId);
router.get('/applications/job/:id', authenticateToken, getApplicationsByJobId);
router.post('/applications',authenticateToken, validate(createApplicationPayloadSchema), applyJob);
router.put('/applications/:id', authenticateToken, updateApplicationById);
router.delete('/applications/:id', authenticateToken, deleteApplicationById);

export default router;