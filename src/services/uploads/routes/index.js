import { Router } from 'express';
import { uploadDocument } from '../controller/upload-controller.js';
import { deleteDocument } from '../controller/upload-controller.js';
import { getAllDocument } from '../controller/upload-controller.js';
import { getDocumentById } from '../controller/upload-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import { upload } from '../storage/storage-config.js';

const router = Router();
 
router.post('/documents', authenticateToken, upload.single('document'), uploadDocument);
router.delete('/documents/:id', authenticateToken, deleteDocument);
router.get('/documents', getAllDocument);
router.get('/documents/:id', getDocumentById);
 
export default router; 
