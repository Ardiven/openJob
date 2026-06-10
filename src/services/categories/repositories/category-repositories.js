import {Pool} from 'pg';
import { nanoid } from 'nanoid';

class categoryRepository {
    constructor() {
        this.pool = new Pool();
    }

    async getCategories() {
        const query = {
            text: 'SELECT * FROM categories',
        }
        const result = await this.pool.query(query);
        return {categories: result.rows};
    }
    
    async getCategoryById(id) {
        const query = {
            text: 'SELECT * FROM categories WHERE id = $1',
            values: [id],
        }
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }

    async createCategory({ name }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const query = {
            text: 'INSERT INTO categories (id, name, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [id, name, createdAt, updatedAt],
        }
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }

    async updateCategoryById(id, { name }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE categories SET name = $1, updated_at = $2 WHERE id = $3 RETURNING *',
            values: [name, updatedAt, id],
        }
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }
    
    async deleteCategoryById(id) {
        const query = {
            text: 'DELETE FROM categories WHERE id = $1 RETURNING *',
            values: [id],
        }
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }
}

export default new categoryRepository();