import companyRepository from "../repositories/company-repositories.js";
import response from "../../../utils/response.js";

export const createCompany = async (req, res, next) => {
    try {
        const { name, location, description } = req.body;
        const company = await companyRepository.createCompany({ name, location, description }); 
        return response(res, 201, 'Company berhasil ditambahkan', company);
    } catch (error) {
        next(error);
    }
};

export const getCompanies = async (req, res, next) => {
    try {
        const companies = await companyRepository.getCompanies(); 
        return response(res, 200, 'Companies berhasil didapatkan', companies);
    } catch (error) {
        next(error);
    }
};

export const getCompanyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const company = await companyRepository.getCompanyById(id);
        if (!company) return response(res, 404, 'Company tidak ditemukan', null);
        res.setHeader('X-Data-Source', company.source);
        return response(res, 200, 'Company berhasil didapatkan', company.data);
    } catch (error) {
        next(error);
    }
};

export const updateCompanyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, location, description } = req.body;
        const company = await companyRepository.updateCompanyById(id, { name, location, description }); 
        if (!company) return response(res, 404, 'Company tidak ditemukan', null);
        return response(res, 200, 'Company berhasil diperbarui', company);
    } catch (error) {
        next(error);
    }
};

export const deleteCompanyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const company = await companyRepository.deleteCompanyById(id); 
        if (!company) return response(res, 404, 'Company tidak ditemukan', null);
        return response(res, 200, 'Company berhasil dihapus', company);
    } catch (error) {
        next(error);
    }
};