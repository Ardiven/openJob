import { Pool } from 'pg';
import { nanoid } from 'nanoid';

export class jobRepository {
    constructor() {
        this.pool = new Pool();
    }

    async createJob({ title, description, category_id, company_id, owner_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status }) {
        const id = `job-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO jobs (id, title, description, category_id, company_id, owner_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id',
            values: [id, title, description, category_id, company_id, owner_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status],
        };
        const result = await this.pool.query(query);
        return {id: result.rows[0].id};
    }
    
    async getAllJobs(title, company_name) {
        const query = {
            text: `
                SELECT 
                    jobs.id,
                    jobs.company_id,
                    jobs.category_id,
                    jobs.title,
                    jobs.description,
                    jobs.job_type,
                    jobs.experience_level,
                    jobs.location_type,
                    jobs.location_city,
                    jobs.salary_min,
                    jobs.salary_max,
                    jobs.is_salary_visible,
                    jobs.status
                FROM jobs
            `,
        };
        
        if (title && company_name) {
            query.text += `
                JOIN companies 
                ON jobs.company_id = companies.id
                WHERE jobs.title ILIKE $1 
                AND companies.name ILIKE $2
            `;

            query.values = [`%${title}%`, `%${company_name}%`];

        } else if (company_name) {

            query.text += `
                JOIN companies 
                ON jobs.company_id = companies.id
                WHERE companies.name ILIKE $1
            `;

            query.values = [`%${company_name}%`];

        } else if (title) {

            query.text += `
                WHERE jobs.title ILIKE $1
            `;

            query.values = [`%${title}%`];
        }

        const result = await this.pool.query(query);

        return { jobs: result.rows };
    }
    
    async getJobById(id) {
        const query = {
            text: 'SELECT * FROM jobs WHERE id = $1',
            values: [id],
        };
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        }
        return {id: result.rows[0].id, title: result.rows[0].title};
    }
    
    async getJobsByCompanyId(company_id) {
        const query = {
            text: 'SELECT * FROM jobs WHERE company_id = $1',
            values: [company_id],
        };
        const result = await this.pool.query(query);
        return {jobs: result.rows};
    }

    async getJobsByCategoryId(category_id) {
        const query = {
            text: 'SELECT * FROM jobs WHERE category_id = $1',
            values: [category_id],
        };
        const result = await this.pool.query(query);
        return {jobs: result.rows};
    }
    
    async deleteJobById(id) {
        const query = {
            text: 'DELETE FROM jobs WHERE id = $1 RETURNING *',
            values: [id],
        };
        await this.pool.query(query);
        return {id};
    }

    async updateJobById(id, { title, description, salary_max }) {
        const query = {
            text: 'UPDATE jobs SET title = $1, description = $2, salary_max = $3 WHERE id = $4 RETURNING *',
            values: [title, description, salary_max, id],
        };
        const result = await this.pool.query(query);
        return result.rows[0];
    }
}

export default new jobRepository();