import bookmarkRepositories from "../repositories/bookmark-repositories.js";
import response from "../../../utils/response.js";

export const createBookmark = async (req, res) => {
    const userId = req.user.id;
    const { id: jobId } = req.params;
    const bookmark = await bookmarkRepositories.createBookmark({ jobId, userId });
    return response(res, 201, "Bookmark berhasil ditambahkan", bookmark);
};

export const getBookmarksByUserId = async (req, res) => {
    const userId = req.user.id;
    const bookmarks = await bookmarkRepositories.getBookmarksByUserId(userId);
    if(!bookmarks) return response(res, 404, "Bookmark tidak ditemukan", null);
    res.setHeader("X-Data-Source", bookmarks.source);
    return response(res, 200, "Bookmark berhasil didapatkan", {bookmarks: bookmarks.data});
};

export const getBookmarkById = async (req, res) => {
    const {jobId, bookmarkId } = req.params;
    const bookmark = await bookmarkRepositories.getBookmarkById(jobId, bookmarkId);
    if (!bookmark) return response(res, 404, "Bookmark tidak ditemukan", null);
    return response(res, 200, "Bookmark berhasil didapatkan", bookmark);
};

export const deleteBookmarkById = async (req, res) => {
    const jobId  = req.params.jobId;
    const bookmark = await bookmarkRepositories.deleteBookmarkById(jobId);
    return response(res, 200, "Bookmark berhasil dihapus", bookmark);
};