import 'dotenv/config';
 
import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';
import { swaggerUi, specs } from './swagger.js';
 
const app = express();


app.use(express.json());
app.use('/documents', express.static('src/services/uploads/files/documents'));
app.use(routes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(ErrorHandler);
 
export default app;
