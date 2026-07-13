import 'dotenv/config';
 
import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';
import { swaggerUi, specs } from './swagger.js';
 
const app = express();

app.use(express.json());
app.use('/documents', express.static('src/services/uploads/files/documents'));
app.use(routes);

// ─── Swagger UI Configuration ────────────────────────────────────────────────
const SWAGGER_UI_VERSION = '5.18.2';
const CDN = `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${SWAGGER_UI_VERSION}`;

const swaggerUiOptions = {
  // Load Swagger UI assets from CDN to avoid Vercel serverless static-file issues
  customJs: [
    `${CDN}/swagger-ui-bundle.js`,
    `${CDN}/swagger-ui-standalone-preset.js`,
  ],
  customCssUrl: `${CDN}/swagger-ui.css`,

  // Custom CSS to improve visual appearance
  customCss: `
    /* Header styling */
    .swagger-ui .topbar { background-color: #1a1a2e; }
    .swagger-ui .topbar .download-url-wrapper { display: none; }

    /* Info section */
    .swagger-ui .info hgroup.main { margin-bottom: 20px; }
    .swagger-ui .info .title { color: #1a1a2e; font-size: 32px; }

    /* Tag section headers */
    .swagger-ui .opblock-tag {
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px solid #e8e8e8;
    }

    /* Try it out button always visible */
    .swagger-ui .btn.try-out__btn { 
      background: #4a90e2; 
      color: white; 
      border: none;
      border-radius: 4px;
    }
    .swagger-ui .btn.try-out__btn:hover { background: #357abd; }

    /* Execute button */
    .swagger-ui .btn.execute { 
      background: #49cc90; 
      border-color: #49cc90;
    }

    /* Schema example area */
    .swagger-ui .highlight-code { border-radius: 6px; }

    /* Model schemas */
    .swagger-ui section.models { border: 1px solid #e8e8e8; border-radius: 8px; }
    .swagger-ui section.models h4 { color: #1a1a2e; }
  `,
  customSiteTitle: 'Open Job API Docs',
  customfavIcon: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/favicon-32x32.png',

  // Swagger UI display options
  swaggerOptions: {
    // Expand tags by default (show all sections)
    defaultModelExpandDepth: 2,
    // Show "Try it out" enabled state on page load
    tryItOutEnabled: true,
    // Display request duration in response
    displayRequestDuration: true,
    // Show operation IDs
    displayOperationId: false,
    // Filter/search bar
    filter: true,
    // Sort tags alphabetically (false = use order defined in spec)
    tagsSorter: 'alpha',
    // Sort operations: 'alpha' | 'method' | null (spec order)
    operationsSorter: 'method',
    // Persist auth between page refreshes
    persistAuthorization: true,
    // Collapse all operations by default: 'list' | 'full' | 'none'
    docExpansion: 'list',
    // Hide the Schemas section at the bottom (-1 = hidden)
    defaultModelsExpandDepth: -1,
  },
};

app.use('/', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

app.use(ErrorHandler);
 
export default app;
