import userRepositories from "../../user/repositories/user-repositories.js";
import applicationRepositories from "../../applications/repositories/application-repositories.js";
import bookmarkRepositories from "../../bookmarks/repositories/bookmark-repositories.js";
import response from "../../../utils/response.js";

export const getProfile = async (req, res) => {
    const userId = req.user.id;
    const user = await userRepositories.getUserById(userId);
    return response(res, 200, "Profile berhasil didapatkan",  user.data ); 
};

export const getApplications = async (req, res) => {
    const userId = req.user.id;
    const applications = await applicationRepositories.getApplicationsByUserId(userId);
    return response(res, 200, "Applications berhasil didapatkan",  {applications: applications.data} ); 
};

export const getBookmarks = async (req, res) => {
    const userId = req.user.id;
    const bookmarks = await bookmarkRepositories.getBookmarksByUserId(userId);
    return response(res, 200, "Bookmarks berhasil didapatkan",  {bookmarks: bookmarks.data} ); 
};