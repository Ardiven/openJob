import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import CacheService from '../../cache/redis-service.js';

class BookmarkRepositories {
    constructor() {
        this.pool = new Pool();
        this.cacheService = new CacheService();
    }


    async createBookmark( {jobId, userId }) {
        const id = `bookmark-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO bookmarks (id, job_id, user_id, created_at, updated_at) VALUES ($1, $2, $3 ,$4, $5) RETURNING id',
            values: [id, jobId, userId, createdAt, updatedAt],
        };
        const result = await this.pool.query(query);
        await this.cacheService.delete(`bookmarks:${userId}`);
        return { id: result.rows[0].id };
    }

    async getBookmarkById(jobId, bookmarkId) {
        const query = {
            text: 'SELECT * FROM bookmarks WHERE job_id = $1 and id = $2',
            values: [jobId, bookmarkId],
        };
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        }
        return { id: result.rows[0].id };
    }

    async getBookmarksByUserId(userId) {
        try{
            const cacheBookmarks = await this.cacheService.get(`bookmarks:${userId}`); 
            return {
                source: 'cache',
                data: JSON.parse(cacheBookmarks),
            };
        }catch (error) {
            const query = {
                text: 'SELECT b.id, j.title, j.description, j.company_id, j.category_id, j.job_type, j.experience_level, j.location_type, j.location_city, j.salary_min, j.salary_max, j.is_salary_visible, j.status, j.created_at, j.updated_at, b.created_at as bookmark_created_at, b.updated_at as bookmark_updated_at, b.user_id FROM bookmarks b join jobs j on j.id = b.job_id WHERE user_id = $1',
                values: [userId],
            };
            const result = await this.pool.query(query);
            await this.cacheService.set(`bookmarks:${userId}`, JSON.stringify(result.rows));
            return {data: result.rows, source: 'database'};
        }
    }

    async deleteBookmarkById(jobId) {
        const query = {
            text: 'DELETE FROM bookmarks WHERE job_id = $1 RETURNING *',
            values: [jobId],
        };
        const result = await this.pool.query(query);
        await this.cacheService.delete(`bookmarks:${result.rows[0].user_id}`);
        return result.rows[0];
    }
}

export default new BookmarkRepositories();