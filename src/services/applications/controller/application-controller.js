import applictionRepositories from "../repositories/application-repositories.js";
import jobRepositories from "../../jobs/repositories/job-repositories.js";
import publisher from "../../queue/publisher.js";
import response from "../../../utils/response.js";
import { InvariantError } from "../../../exceptions/index.js";

export const applyJob = async (req, res, next) => {
    try {
        const { user_id, job_id, status  } = req.body;
        const job = await jobRepositories.getJobById(job_id);
        if(!job) throw new InvariantError("Job tidak ditemukan");
        const createAt = new Date().toISOString();
        const updatedAt = createAt;
        const application = await applictionRepositories.createApplication({ user_id, job_id, status, createAt, updatedAt });

        // Publish ke RabbitMQ (tidak mengganggu response)
        await publisher.publishApplication(application.id);
        return response(res, 201, "Anda berhasil melamar pekerjaan", application);
    } catch (error) {
        if (error.code === "23505") {
            throw new InvariantError("Anda sudah melamar pekerjaan ini");
        }
        next(error);
    }
};

export const getApplications = async (req, res, next) => {
    try {
        const applications = await applictionRepositories.getApplications();
        return response(res, 200, "Applications berhasil didapatkan", {applications: applications});
    } catch (error) {
        next(error);
    }
};

export const getApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await applictionRepositories.getApplicationById(id);
        if (!application) return response(res, 404, "Application tidak ditemukan", null);
        res.setHeader("X-Data-Source", application.source);
        return response(res, 200, "Application berhasil didapatkan", application.data);
    } catch (error) {
        next(error);
    }
};

export const deleteApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await applictionRepositories.deleteApplicationById(id);
        if (!application) return response(res, 404, "Application tidak ditemukan", null);
        return response(res, 200, "Application berhasil dihapus", application);
    } catch (error) {
        next(error);
    }
};

export const updateApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const application = await applictionRepositories.updateApplicationById(id, { status });
        if (!application) return response(res, 404, "Application tidak ditemukan", null);
        return response(res, 200, "Application berhasil diperbarui", application);
    } catch (error) {
        next(error);
    }
};

export const getApplicationsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const applications = await applictionRepositories.getApplicationsByUserId(id);
        res.setHeader("X-Data-Source", applications.source);
        return response(res, 200, "Applications berhasil didapatkan", {applications: applications.data});
    } catch (error) {
        next(error);
    }
};

export const getApplicationsByJobId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const applications = await applictionRepositories.getApplicationsByJobId(id);
        res.setHeader("X-Data-Source", applications.source);
        return response(res, 200, "Applications berhasil didapatkan", {applications: applications.data});
    } catch (error) {
        next(error);
    }
};