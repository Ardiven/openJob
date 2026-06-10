import { Router } from 'express';
import users from '../services/user/routes/index.js';
import authentications from '../services/authentications/routes/index.js';
import companies from '../services/companies/routes/index.js';
import categories from '../services/categories/routes/index.js';
import jobs from '../services/jobs/routes/index.js';
import applications from '../services/applications/routes/index.js';
import bookmark from '../services/bookmarks/routes/index.js';
import profiles from '../services/profiles/routes/index.js';
import uploads from '../services/uploads/routes/index.js';



const routes = Router();

routes.use('/', users);
routes.use('/', authentications);
routes.use('/', companies);
routes.use('/', categories);
routes.use('/', jobs);
routes.use('/', applications);
routes.use('/', bookmark);
routes.use('/', profiles);
routes.use('/', uploads);

export default routes;