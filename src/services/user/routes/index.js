import { Router } from 'express';
import validate from '../../../middlewares/validate.js';
import  {createUserPayloadSchema}  from '../validator/schema.js';
import {
    createUser,
    getUserById 
} from '../controller/user-controller.js';

const router = Router();

router.post('/users', validate(createUserPayloadSchema), createUser);
router.get('/users/:id', getUserById);

export default router;