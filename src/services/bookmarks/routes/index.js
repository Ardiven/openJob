import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";

import {
    createBookmark,
    getBookmarkById,
    getBookmarksByUserId,
    deleteBookmarkById
}from "../controller/bookmark-controller.js";

const router = Router();

router.post('/jobs/:id/bookmark', authenticateToken, createBookmark);
router.get('/jobs/:jobId/bookmark/:bookmarkId', authenticateToken, getBookmarkById);
router.get('/bookmarks', authenticateToken, getBookmarksByUserId);
router.delete('/jobs/:jobId/bookmark', authenticateToken, deleteBookmarkById);

export default router;