import jobRepository  from "../repositories/job-repositories.js";
import response from "../../../utils/response.js";

export const getJobs = async (req, res, next) => {
    try {
        const title = req.query.title;
        const { 'company-name': companyName } = req.query;
        const jobs = await jobRepository.getAllJobs(title, companyName);
        return response(res, 200, "Jobs berhasil didapatkan", jobs);
    } catch (error) {
        next(error);
    }
};

export const getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobRepository.getJobById(id);
        if (!job) return response(res, 404, "Job tidak ditemukan", null);
        return response(res, 200, "Job berhasil didapatkan", job);
    } catch (error) {
        next(error);
    }
};

export const getJobsByCategoryId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobs = await jobRepository.getJobsByCategoryId(id);
        return response(res, 200, "Jobs berhasil didapatkan", jobs);
    } catch (error) {
        next(error);
    }
};

export const getJobsByCompanyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobs = await jobRepository.getJobsByCompanyId(id);
        return response(res, 200, "Jobs berhasil didapatkan", jobs);
    } catch (error) {
        next(error);
    }
};

export const createJob = async (req, res, next) => {
    try {
        const owner_id = req.user.id;
        const { title, description, category_id, company_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status } = req.body;
        const job = await jobRepository.createJob({ title, description, category_id, company_id, owner_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status });
        return response(res, 201, "Job berhasil ditambahkan", job);
    } catch (error) {
        next(error);
    }
};

export const deleteJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobRepository.deleteJobById(id);
        if (!job) return response(res, 404, "Job tidak ditemukan", null);
        return response(res, 200, "Job berhasil dihapus", job);
    } catch (error) {
        next(error);
    }
};

export const updateJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, salary_max } = req.body;
        const job = await jobRepository.updateJobById(id, { title, description, salary_max });
        if (!job) return response(res, 404, "Job tidak ditemukan", null);
        return response(res, 200, "Job berhasil diupdate", job);
    } catch (error) {
        next(error);
    }
};
