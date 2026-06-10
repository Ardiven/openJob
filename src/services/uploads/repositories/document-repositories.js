import { Pool } from 'pg';
import { nanoid } from 'nanoid';

export class DocumentRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createDocument({ originalName, filename, fileLocation: path, owner }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        
        const query = {
            text: 'INSERT INTO documents (id, originalname, filename, path, owner, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            values: [id, originalName, filename, path, owner, createdAt, updatedAt],
        }

        const result = await this.pool.query(query);
        
        return result.rows[0];
    }

    async getDocumentById(id) {
        const query = {
            text: 'SELECT * FROM documents WHERE id = $1',
            values: [id],
        }
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }

    async getDocuments(){
        const query = {
            text: 'SELECT * FROM documents',
        }
        const result = await this.pool.query(query);
        return {documents: result.rows};
    }

    async getDocumentPathById(id) {
        const query = {
            text: 'SELECT path FROM documents WHERE id = $1',
            values: [id],
        }
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }

    async deleteDocumentById(id, owner) {
        const query = {
            text: 'DELETE FROM documents WHERE id = $1 and owner = $2 RETURNING *',
            values: [id, owner],
        }
        const result = await this.pool.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }

}

export default new DocumentRepositories();