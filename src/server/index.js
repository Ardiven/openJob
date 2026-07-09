import 'dotenv/config';
 
import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';
import { swaggerUi, specs } from './swagger.js';
 
const app = express();


app.use(express.json());
app.use('/documents', express.static('src/services/uploads/files/documents'));
app.use(routes);
const swaggerUiOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js',
  ]
};

app.use('/', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

app.use(ErrorHandler);
 
export default app;
