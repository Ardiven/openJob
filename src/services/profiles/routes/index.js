import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import {
    getProfile,
    getBookmarks,
    getApplications
} from '../controller/profile-controller.js';

const router = Router();
router.get('/profile', authenticateToken, getProfile);
router.get('/profile/bookmarks', authenticateToken, getBookmarks);
router.get('/profile/applications', authenticateToken, getApplications);

export default router;