import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import CacheService from '../../cache/redis-service.js';

class userRepository {
    constructor() {
        this.pool = new Pool();
        this.cacheService = new CacheService();
    }
    async createUser({ name, email, password, role }) {
        const id = nanoid(16);
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            values: [id, name, email, hashedPassword, role, createdAt, updatedAt],
        }

        const result = await this.pool.query(query);
        await this.cacheService.delete(`user:${id}`);
        return result.rows[0];
    }

    async getUserById(id) {
        try{
            const cacheUser = await this.cacheService.get(`user:${id}`); 
            return {
                source: 'cache',
                data: JSON.parse(cacheUser),
            };

        }catch (error) {
            const query = {
                text: 'SELECT * FROM users WHERE id = $1',
                values: [id],
            }
            const result = await this.pool.query(query);
            if (result.rows.length === 0) {
                return null;
            }
            await this.cacheService.set(
                `user:${id}`,
                JSON.stringify(result.rows[0])
            );
            return {data: result.rows[0], source: 'database'};
        }
    }
    async verifyUserCredential(email, password) {    
        const query = {
            text: 'SELECT id, password FROM users WHERE email = $1',
            values: [email],
        };
        
        const user = await this.pool.query(query);
        if (!user) {
            return null;
        }
        if (user.rows.length === 0) {
            return null;
        }
        
        const { id, password: hashedPassword } = user.rows[0];
        const isPasswordNatch = await bcrypt.compare(password, hashedPassword);
        
        if (!isPasswordNatch) {
            return null;
        }
        return id;
    }
}

export default new userRepository();

