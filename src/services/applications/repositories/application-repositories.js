import {Pool} from 'pg';
import { nanoid } from 'nanoid';
import CacheService from '../../cache/redis-service.js';

class applicationRepository {
    constructor() {
        this.pool = new Pool();
        this.cacheService = new CacheService();
    }

    async createApplication({ job_id, user_id, status, createAt, updatedAt }) {
        const id = `app-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO applications (id, job_id, user_id, status, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, user_id, job_id, status',
            values: [id, job_id, user_id, status, createAt, updatedAt],
        };
        const result = await this.pool.query(query);
        await this.cacheService.delete(`applications:${id}`);
        await this.cacheService.delete(`applications:${user_id}`);
        await this.cacheService.delete(`applications:jobs:${job_id}`);
        return result.rows[0];
    }

    async getApplications() {
        const query = {
            text: 'SELECT a.id, j.title, j.description, j.company_id, j.category_id, j.job_type, j.experience_level, j.location_type, j.location_city, a.user_id, a.status, a.created_at, a.updated_at  FROM applications a join jobs j on j.id = a.job_id',
        };
        const result = await this.pool.query(query);
        return result.rows;
    }

    async getApplicationById(id) {
        try {
            const cacheApplication = await this.cacheService.get(`application:${id}`); 
            return {
                source: 'cache',
                data: JSON.parse(cacheApplication),
            };
        } catch (error) {
            const query = {
            text: 'SELECT id, job_id, user_id, status FROM applications WHERE id = $1',
            values: [id],
        };
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        }
        await this.cacheService.set(
            `application:${id}`,
            JSON.stringify(result.rows[0])
        )
        return {data: result.rows[0], source: 'database'};
        }
        
    }

    async getApplicationsByUserId(user_id) {
        try {
            const cacheApplications = await this.cacheService.get(`applications:${user_id}`); 
            return {
                source: 'cache',
                data: JSON.parse(cacheApplications),
            };
        }catch (error) {
            const query = {
                text: 'SELECT a.*, j.title, j.description, j.company_id, j.category_id, j.job_type, j.experience_level, j.location_type, j.location_city, j.salary_min FROM applications a join jobs j on j.id = a.job_id WHERE a.user_id = $1',
                values: [user_id],
            };
            const result = await this.pool.query(query);
            await this.cacheService.set(
                `applications:${user_id}`,
                JSON.stringify(result.rows)
            )
            return {data: result.rows, source: 'database'};
        }
        
    }

    async getApplicationsByJobId(job_id) {
        try{
            const cacheApplications = await this.cacheService.get(`applications:${job_id}`); 
            return {
                source: 'cache',
                data: JSON.parse(cacheApplications),
            };
        }catch (error) {
            const query = {
                text: 'SELECT * FROM applications WHERE job_id = $1',
                values: [job_id],
            };
            const result = await this.pool.query(query);
            await this.cacheService.set(
                `applications:${job_id}`,
                JSON.stringify(result.rows)
            )
            return {data: result.rows, source: 'database'};
        }
    }

    async updateApplicationById(id, { status }) {
        const query = {
            text: 'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
            values: [status, id],
        };
        const result = await this.pool.query(query);
        await this.cacheService.delete(`application:${id}`);
        return result.rows[0];
    }

    async deleteApplicationById(id) {
        const query = {
            text: 'DELETE FROM applications WHERE id = $1 RETURNING *',
            values: [id],
        };
        const result = await this.pool.query(query);
        await this.cacheService.delete(`application:${id}`);
        return result.rows[0];
    }
}

export default new applicationRepository();