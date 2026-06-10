import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import { 
    getJobs,
    getJobById,
    getJobsByCategoryId,
    getJobsByCompanyId,
    createJob,
    deleteJobById,
    updateJobById
} from "../controller/job-controller.js";
import validate from "../../../middlewares/validate.js";
import { createJobPayloadSchema } from "../validator/schema.js";

const router = Router();

router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.get('/jobs/category/:id', getJobsByCategoryId);
router.get('/jobs/company/:id', getJobsByCompanyId);
router.post('/jobs',authenticateToken, validate(createJobPayloadSchema), createJob);
router.delete('/jobs/:id', authenticateToken, deleteJobById);
router.put('/jobs/:id', authenticateToken, updateJobById);

export default router;