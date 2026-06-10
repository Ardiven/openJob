import response from "../../../utils/response.js"; 
import categoryRepository from "../repositories/category-repositories.js";

export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await categoryRepository.createCategory({ name });
        return response(res, 201, 'Category berhasil ditambahkan', category);
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryRepository.getCategories();
        return response(res, 200, 'Categories berhasil didapatkan', categories);
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await categoryRepository.getCategoryById(id);
        if (!category) return response(res, 404, 'Category tidak ditemukan', null);
        return response(res, 200, 'Category berhasil didapatkan', category);
    } catch (error) {
        next(error);
    }
};

export const updateCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryRepository.updateCategoryById(id, { name });
        if (!category) return response(res, 404, 'Category tidak ditemukan', null);
        return response(res, 200, 'Category berhasil diperbarui', category);
    } catch (error) {
        next(error);
    }
};

export const deleteCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await categoryRepository.deleteCategoryById(id);
        if (!category) return response(res, 404, 'Category tidak ditemukan', null);
        return response(res, 200, 'Category berhasil dihapus', category);
    } catch (error) {
        next(error);
    }
};
