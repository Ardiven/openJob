import userRepositories from "../repositories/user-repositories.js";
import response from "../../../utils/response.js";
import NotFoundError from "../../../exceptions/not-found-error.js";

export const createUser = async (req, res) => {
    res.header('Content-Type', 'application/json');
    const { name, email, password, role } = req.body;
    const user = await userRepositories.createUser({ name, email, password, role });

    if (!user) {
        return response(res, 400, 'user gagal ditambahkan');
    }

    return response(res, 201, 'user berhasil ditambahkan', user);
}

export const getUserById = async (req, res, next) => {
    res.header('Content-Type', 'application/json');
    const { id } = req.params;
    const user = await userRepositories.getUserById(id);

    if (!user) {
        // return next(new NotFoundError('Catatan tidak ditemukan'));
        return next(new NotFoundError('User tidak ditemukan'));
    }
    res.setHeader('X-Data-Source', user.source);
    return response(res, 200, 'User berhasil didapatkan', user.data);
}