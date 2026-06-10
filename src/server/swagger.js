import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Open Job API', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {

      // ─── USERS ───────────────────────────────────────────
      '/users': {
        post: {
          summary: 'Register user',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              password: { type: 'string' },
            }}}}
          },
          responses: { 201: { description: 'User created' } }
        }
      },
      '/users/{id}': {
        get: {
          summary: 'Get user by ID',
          tags: ['Users'],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        }
      },

      // ─── AUTHENTICATIONS ─────────────────────────────────
      '/authentications': {
        post: {
          summary: 'Login',
          tags: ['Authentications'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              email: { type: 'string' },
              password: { type: 'string' },
            }}}}
          },
          responses: { 200: { description: 'Login success, returns token' } }
        },
        put: {
          summary: 'Refresh token',
          tags: ['Authentications'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              refreshToken: { type: 'string' },
            }}}}
          },
          responses: { 200: { description: 'Token refreshed' } }
        },
        delete: {
          summary: 'Logout',
          tags: ['Authentications'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              refreshToken: { type: 'string' },
            }}}}
          },
          responses: { 200: { description: 'Logged out' } }
        }
      },

      // ─── JOBS ─────────────────────────────────────────────
      '/jobs': {
        get: {
          summary: 'Get all jobs',
          tags: ['Jobs'],
          responses: { 200: { description: 'Success' } }
        },
        post: {
          summary: 'Create a job',
          tags: ['Jobs'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              companyId: { type: 'string' },
              categoryId: { type: 'string' },
            }}}}
          },
          responses: { 201: { description: 'Job created' } }
        }
      },
      '/jobs/{id}': {
        get: {
          summary: 'Get job by ID',
          tags: ['Jobs'],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        },
        put: {
          summary: 'Update job by ID',
          tags: ['Jobs'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object' } } }
          },
          responses: { 200: { description: 'Job updated' } }
        },
        delete: {
          summary: 'Delete job by ID',
          tags: ['Jobs'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Job deleted' } }
        }
      },
      '/jobs/category/{id}': {
        get: {
          summary: 'Get jobs by category ID',
          tags: ['Jobs'],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        }
      },
      '/jobs/company/{id}': {
        get: {
          summary: 'Get jobs by company ID',
          tags: ['Jobs'],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        }
      },

      // ─── CATEGORIES ───────────────────────────────────────
      '/categories': {
        get: {
          summary: 'Get all categories',
          tags: ['Categories'],
          responses: { 200: { description: 'Success' } }
        },
        post: {
          summary: 'Create category',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              name: { type: 'string' },
            }}}}
          },
          responses: { 201: { description: 'Category created' } }
        }
      },
      '/categories/{id}': {
        get: {
          summary: 'Get category by ID',
          tags: ['Categories'],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        },
        put: {
          summary: 'Update category by ID',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object' } } }
          },
          responses: { 200: { description: 'Category updated' } }
        },
        delete: {
          summary: 'Delete category by ID',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Category deleted' } }
        }
      },

      // ─── COMPANIES ────────────────────────────────────────
      '/companies': {
        get: {
          summary: 'Get all companies',
          tags: ['Companies'],
          responses: { 200: { description: 'Success' } }
        },
        post: {
          summary: 'Create company',
          tags: ['Companies'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              name: { type: 'string' },
              description: { type: 'string' },
            }}}}
          },
          responses: { 201: { description: 'Company created' } }
        }
      },
      '/companies/{id}': {
        get: {
          summary: 'Get company by ID',
          tags: ['Companies'],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        },
        put: {
          summary: 'Update company by ID',
          tags: ['Companies'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object' } } }
          },
          responses: { 200: { description: 'Company updated' } }
        },
        delete: {
          summary: 'Delete company by ID',
          tags: ['Companies'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Company deleted' } }
        }
      },

      // ─── APPLICATIONS ─────────────────────────────────────
      '/applications': {
        get: {
          summary: 'Get all applications',
          tags: ['Applications'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Success' } }
        },
        post: {
          summary: 'Apply to a job',
          tags: ['Applications'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: {
              jobId: { type: 'string' },
            }}}}
          },
          responses: { 201: { description: 'Application created' } }
        }
      },
      '/applications/{id}': {
        get: {
          summary: 'Get application by ID',
          tags: ['Applications'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        },
        put: {
          summary: 'Update application by ID',
          tags: ['Applications'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object' } } }
          },
          responses: { 200: { description: 'Application updated' } }
        },
        delete: {
          summary: 'Delete application by ID',
          tags: ['Applications'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Application deleted' } }
        }
      },
      '/applications/user/{id}': {
        get: {
          summary: 'Get applications by user ID',
          tags: ['Applications'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        }
      },
      '/applications/job/{id}': {
        get: {
          summary: 'Get applications by job ID',
          tags: ['Applications'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        }
      },

      // ─── BOOKMARKS ────────────────────────────────────────
      '/jobs/{id}/bookmark': {
        post: {
          summary: 'Bookmark a job',
          tags: ['Bookmarks'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 201: { description: 'Bookmarked' } }
        },
        delete: {
          summary: 'Delete bookmark',
          tags: ['Bookmarks'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Bookmark deleted' } }
        }
      },
      '/jobs/{jobId}/bookmark/{bookmarkId}': {
        get: {
          summary: 'Get bookmark by ID',
          tags: ['Bookmarks'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'jobId', required: true, schema: { type: 'string' } },
            { in: 'path', name: 'bookmarkId', required: true, schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'Success' } }
        }
      },
      '/bookmarks': {
        get: {
          summary: 'Get all bookmarks by user',
          tags: ['Bookmarks'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Success' } }
        }
      },

      // ─── PROFILE ──────────────────────────────────────────
      '/profile': {
        get: {
          summary: 'Get user profile',
          tags: ['Profile'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Success' } }
        }
      },
      '/profile/bookmarks': {
        get: {
          summary: 'Get profile bookmarks',
          tags: ['Profile'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Success' } }
        }
      },
      '/profile/applications': {
        get: {
          summary: 'Get profile applications',
          tags: ['Profile'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Success' } }
        }
      },

      // ─── DOCUMENTS / UPLOADS ──────────────────────────────
      '/documents': {
        get: {
          summary: 'Get all documents',
          tags: ['Documents'],
          responses: { 200: { description: 'Success' } }
        },
        post: {
          summary: 'Upload a document',
          tags: ['Documents'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'multipart/form-data': { schema: { type: 'object', properties: {
              document: { type: 'string', format: 'binary' },
            }}}}
          },
          responses: { 201: { description: 'Document uploaded' } }
        }
      },
      '/documents/{id}': {
        get: {
          summary: 'Get document by ID',
          tags: ['Documents'],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Success' } }
        },
        delete: {
          summary: 'Delete document by ID',
          tags: ['Documents'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Document deleted' } }
        }
      },

    }
  },
  apis: []
};

const specs = options.definition;

export { swaggerUi, specs };