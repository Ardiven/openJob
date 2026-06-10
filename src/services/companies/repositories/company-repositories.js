import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import CacheService from '../../cache/redis-service.js';

class companyRepository {
    constructor() {
        this.pool = new Pool();
        this.cacheService = new CacheService();
    }

    async createCompany({ name, location, description }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const query = {
            text: 'INSERT INTO companies (id, name, location, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            values: [id, name, location, description, createdAt, updatedAt],
        }

        const result = await this.pool.query(query);
        await this.cacheService.delete(`company:${id}`);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }
    
    async getCompanies() {
        const query = {
            text: 'SELECT * FROM companies',
        }
        const result = await this.pool.query(query);
        return {companies: result.rows};
    }

    async getCompanyById(id) {
        try {
            const result = await this.cacheService.get(`company:${id}`);
            return {
                source: 'cache',
                data: JSON.parse(result),
            };
        } catch (error) {
            const query = {
                text: 'SELECT * FROM companies WHERE id = $1',
                values: [id],
            };
            const result = await this.pool.query(query);
            if (result.rows.length === 0) {
                return null;
            }
            await this.cacheService.set(
                `company:${id}`,
                JSON.stringify(result.rows[0])
            );
            return {
                source: 'database',
                data: result.rows[0],
            };
        }
    }

    async updateCompanyById(id, { name, location, description }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE companies SET name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING *',
            values: [name, location, description, updatedAt, id],
        }
        const result = await this.pool.query(query);
        await this.cacheService.delete(`company:${id}`);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }

    async deleteCompanyById(id) {
        const query = {
            text: 'DELETE FROM companies WHERE id = $1 RETURNING *',
            values: [id],
        }
        const result = await this.pool.query(query);
        await this.cacheService.delete(`company:${id}`);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }
}

export default new companyRepository();