import swaggerUi from 'swagger-ui-express';

// ─────────────────────────────────────────────────────────────────────────────
//  Open Job API — Swagger / OpenAPI 3.0 Specification
// ─────────────────────────────────────────────────────────────────────────────

const specs = {
  openapi: '3.0.0',

  // ── Info ───────────────────────────────────────────────────────────────────
  info: {
    title: 'Open Job API',
    version: '1.0.0',
    description: `
## Open Job Platform — REST API

Selamat datang di dokumentasi REST API **Open Job Platform**.
API ini menyediakan semua endpoint yang dibutuhkan untuk:

- 🔐 **Autentikasi** — Register, login, refresh token, logout
- 👤 **Users** — Manajemen akun pengguna
- 💼 **Jobs** — Kelola lowongan pekerjaan
- 🏢 **Companies** — Manajemen data perusahaan
- 🗂️ **Categories** — Kategori pekerjaan
- 📄 **Applications** — Lamaran pekerjaan
- 🔖 **Bookmarks** — Simpan lowongan favorit
- 👤 **Profile** — Profil pengguna aktif
- 📁 **Documents** — Upload & kelola dokumen (CV, dll)

---

### Cara Menggunakan Autentikasi
1. **Register** akun baru via \`POST /users\`
2. **Login** via \`POST /authentications\` — simpan \`accessToken\`
3. Klik tombol **Authorize** 🔒 di atas, masukkan \`accessToken\`
4. Semua endpoint yang memerlukan autentikasi akan otomatis mengirim token

---

### Base URL
- **Development:** \`http://localhost:3000\`
    `,
    contact: {
      name: 'Open Job Team',
      email: 'support@openjob.id',
    },
    license: {
      name: 'ISC',
    },
  },

  // ── Servers ─────────────────────────────────────────────────────────────────

  // ── Tags (urutan tampilan di UI) ────────────────────────────────────────────
  tags: [
    {
      name: '🔐 Authentications',
      description: 'Login, logout, dan refresh access token',
    },
    {
      name: '👤 Users',
      description: 'Registrasi dan manajemen akun pengguna',
    },
    {
      name: '👤 Profile',
      description: 'Profil pengguna yang sedang login (berdasarkan token)',
    },
    {
      name: '💼 Jobs',
      description: 'CRUD lowongan pekerjaan',
    },
    {
      name: '🏢 Companies',
      description: 'CRUD data perusahaan',
    },
    {
      name: '🗂️ Categories',
      description: 'CRUD kategori pekerjaan',
    },
    {
      name: '📄 Applications',
      description: 'Melamar pekerjaan dan manajemen lamaran',
    },
    {
      name: '🔖 Bookmarks',
      description: 'Simpan dan hapus bookmark lowongan favorit',
    },
    {
      name: '📁 Documents',
      description: 'Upload dan manajemen dokumen (CV, portofolio, dll)',
    },
  ],

  // ── Components ──────────────────────────────────────────────────────────────
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Masukkan JWT access token yang didapat dari endpoint `/authentications` (login).',
      },
    },

    schemas: {

      // ════════════════════════════════════
      //  USERS
      // ════════════════════════════════════
      RegisterUserRequest: {
        type: 'object',
        required: ['name', 'email', 'password', 'role'],
        properties: {
          name: {
            type: 'string',
            example: 'Budi Santoso',
            description: 'Nama lengkap pengguna',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'budi.santoso@example.com',
            description: 'Alamat email yang valid dan unik',
          },
          password: {
            type: 'string',
            format: 'password',
            minLength: 6,
            example: 'password123',
            description: 'Password minimal 6 karakter',
          },
          role: {
            type: 'string',
            enum: ['jobseeker', 'employer', 'admin'],
            example: 'jobseeker',
            description: 'Peran pengguna: jobseeker, employer, atau admin',
          },
        },
        example: {
          name: 'Budi Santoso',
          email: 'budi.santoso@example.com',
          password: 'password123',
          role: 'jobseeker',
        },
      },

      UserResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'usr_01HXZ9QKPQ8M3T2R5V7W',
            description: 'ID unik pengguna',
          },
          name: {
            type: 'string',
            example: 'Budi Santoso',
          },
          email: {
            type: 'string',
            example: 'budi.santoso@example.com',
          },
          role: {
            type: 'string',
            example: 'jobseeker',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-15T08:30:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  AUTHENTICATIONS
      // ════════════════════════════════════
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'budi.santoso@example.com',
            description: 'Email yang terdaftar',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'password123',
            description: 'Password akun',
          },
        },
        example: {
          email: 'budi.santoso@example.com',
          password: 'password123',
        },
      },

      RefreshTokenRequest: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfMDFIWFo5UUtQUThNM1QyUjVWN1ciLCJpYXQiOjE3MDU5OTIyMDAsImV4cCI6MTcwNjU5NzAwMH0.dummyRefreshTokenSignature',
            description: 'Refresh token yang didapat saat login',
          },
        },
      },

      LogoutRequest: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfMDFIWFo5UUtQUThNM1QyUjVWN1ciLCJpYXQiOjE3MDU5OTIyMDAsImV4cCI6MTcwNjU5NzAwMH0.dummyRefreshTokenSignature',
            description: 'Refresh token yang akan di-invalidate',
          },
        },
      },

      AuthResponse: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfMDFIWFo5UUtQUThNM1QyUjVWN1ciLCJyb2xlIjoiam9ic2Vla2VyIiwiaWF0IjoxNzA1OTkyMjAwLCJleHAiOjE3MDU5OTU4MDB9.dummyAccessTokenSignature',
            description: 'JWT access token (berlaku 1 jam)',
          },
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfMDFIWFo5UUtQUThNM1QyUjVWN1ciLCJpYXQiOjE3MDU5OTIyMDAsImV4cCI6MTcwNjU5NzAwMH0.dummyRefreshTokenSignature',
            description: 'JWT refresh token (berlaku 7 hari)',
          },
        },
      },

      // ════════════════════════════════════
      //  JOBS
      // ════════════════════════════════════
      CreateJobRequest: {
        type: 'object',
        required: ['title', 'description', 'category_id', 'company_id', 'job_type', 'experience_level', 'location_type', 'status'],
        properties: {
          title: {
            type: 'string',
            example: 'Backend Developer (Node.js)',
            description: 'Judul posisi pekerjaan',
          },
          description: {
            type: 'string',
            example: 'Kami mencari Backend Developer berpengalaman dalam Node.js, Express, dan PostgreSQL. Bertanggung jawab membangun dan memelihara REST API yang handal.',
            description: 'Deskripsi lengkap pekerjaan dan tanggung jawab',
          },
          category_id: {
            type: 'string',
            example: 'cat_01HXZ9QKPQ8M3T2R5V7W',
            description: 'ID kategori pekerjaan',
          },
          company_id: {
            type: 'string',
            example: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
            description: 'ID perusahaan yang membuka lowongan',
          },
          salary_min: {
            type: 'number',
            example: 8000000,
            description: 'Gaji minimum (dalam Rupiah)',
          },
          salary_max: {
            type: 'number',
            example: 15000000,
            description: 'Gaji maksimum (dalam Rupiah)',
          },
          job_type: {
            type: 'string',
            enum: ['fulltime', 'parttime', 'freelance', 'internship', 'contract'],
            example: 'fulltime',
            description: 'Jenis pekerjaan',
          },
          experience_level: {
            type: 'string',
            enum: ['junior', 'mid', 'senior', 'lead', 'manager'],
            example: 'mid',
            description: 'Tingkat pengalaman yang dibutuhkan',
          },
          location_type: {
            type: 'string',
            enum: ['onsite', 'remote', 'hybrid'],
            example: 'hybrid',
            description: 'Tipe lokasi kerja',
          },
          location_city: {
            type: 'string',
            example: 'Jakarta Selatan',
            description: 'Kota lokasi pekerjaan (opsional untuk remote)',
          },
          is_salary_visible: {
            type: 'boolean',
            example: true,
            description: 'Apakah gaji ditampilkan ke pelamar',
          },
          status: {
            type: 'string',
            enum: ['open', 'closed', 'draft'],
            example: 'open',
            description: 'Status lowongan',
          },
        },
        example: {
          title: 'Backend Developer (Node.js)',
          description: 'Kami mencari Backend Developer berpengalaman dalam Node.js, Express, dan PostgreSQL. Bertanggung jawab membangun dan memelihara REST API yang handal.',
          category_id: 'cat_01HXZ9QKPQ8M3T2R5V7W',
          company_id: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
          salary_min: 8000000,
          salary_max: 15000000,
          job_type: 'fulltime',
          experience_level: 'mid',
          location_type: 'hybrid',
          location_city: 'Jakarta Selatan',
          is_salary_visible: true,
          status: 'open',
        },
      },

      JobResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'job_01HXZ9QKPQ8M3T2R5V7W',
          },
          title: {
            type: 'string',
            example: 'Backend Developer (Node.js)',
          },
          description: {
            type: 'string',
            example: 'Kami mencari Backend Developer berpengalaman dalam Node.js...',
          },
          category_id: {
            type: 'string',
            example: 'cat_01HXZ9QKPQ8M3T2R5V7W',
          },
          company_id: {
            type: 'string',
            example: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
          },
          salary_min: {
            type: 'number',
            example: 8000000,
          },
          salary_max: {
            type: 'number',
            example: 15000000,
          },
          job_type: {
            type: 'string',
            example: 'fulltime',
          },
          experience_level: {
            type: 'string',
            example: 'mid',
          },
          location_type: {
            type: 'string',
            example: 'hybrid',
          },
          location_city: {
            type: 'string',
            example: 'Jakarta Selatan',
          },
          is_salary_visible: {
            type: 'boolean',
            example: true,
          },
          status: {
            type: 'string',
            example: 'open',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-15T09:00:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  CATEGORIES
      // ════════════════════════════════════
      CreateCategoryRequest: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'Teknologi Informasi',
            description: 'Nama kategori pekerjaan',
          },
        },
        example: {
          name: 'Teknologi Informasi',
        },
      },

      CategoryResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'cat_01HXZ9QKPQ8M3T2R5V7W',
          },
          name: {
            type: 'string',
            example: 'Teknologi Informasi',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-10T07:00:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  COMPANIES
      // ════════════════════════════════════
      CreateCompanyRequest: {
        type: 'object',
        required: ['name', 'location', 'description'],
        properties: {
          name: {
            type: 'string',
            example: 'PT. Teknologi Nusantara',
            description: 'Nama resmi perusahaan',
          },
          location: {
            type: 'string',
            example: 'Jakarta Selatan, DKI Jakarta',
            description: 'Kota / alamat kantor utama',
          },
          description: {
            type: 'string',
            example: 'PT. Teknologi Nusantara adalah perusahaan teknologi yang bergerak di bidang pengembangan software enterprise dan solusi cloud untuk korporasi di Indonesia.',
            description: 'Deskripsi singkat tentang perusahaan',
          },
        },
        example: {
          name: 'PT. Teknologi Nusantara',
          location: 'Jakarta Selatan, DKI Jakarta',
          description: 'PT. Teknologi Nusantara adalah perusahaan teknologi yang bergerak di bidang pengembangan software enterprise dan solusi cloud untuk korporasi di Indonesia.',
        },
      },

      UpdateCompanyRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'PT. Teknologi Nusantara (Updated)',
            description: 'Nama baru perusahaan (opsional)',
          },
          location: {
            type: 'string',
            example: 'Bandung, Jawa Barat',
            description: 'Lokasi baru (opsional)',
          },
          description: {
            type: 'string',
            example: 'Perusahaan teknologi terkemuka di Indonesia dengan fokus pada inovasi digital.',
            description: 'Deskripsi baru (opsional)',
          },
        },
        example: {
          name: 'PT. Teknologi Nusantara (Updated)',
          location: 'Bandung, Jawa Barat',
          description: 'Perusahaan teknologi terkemuka di Indonesia dengan fokus pada inovasi digital.',
        },
      },

      CompanyResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
          },
          name: {
            type: 'string',
            example: 'PT. Teknologi Nusantara',
          },
          location: {
            type: 'string',
            example: 'Jakarta Selatan, DKI Jakarta',
          },
          description: {
            type: 'string',
            example: 'PT. Teknologi Nusantara adalah perusahaan teknologi...',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-12T08:00:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  APPLICATIONS
      // ════════════════════════════════════
      CreateApplicationRequest: {
        type: 'object',
        required: ['job_id', 'user_id', 'status'],
        properties: {
          job_id: {
            type: 'string',
            example: 'job_01HXZ9QKPQ8M3T2R5V7W',
            description: 'ID lowongan yang dilamar',
          },
          user_id: {
            type: 'string',
            example: 'usr_01HXZ9QKPQ8M3T2R5V7W',
            description: 'ID pelamar',
          },
          status: {
            type: 'string',
            enum: ['pending', 'review', 'interview', 'accepted', 'rejected'],
            example: 'pending',
            description: 'Status awal lamaran (biasanya "pending")',
          },
        },
        example: {
          job_id: 'job_01HXZ9QKPQ8M3T2R5V7W',
          user_id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
          status: 'pending',
        },
      },

      ApplicationResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'app_01HXZ9QKPQ8M3T2R5V7W',
          },
          job_id: {
            type: 'string',
            example: 'job_01HXZ9QKPQ8M3T2R5V7W',
          },
          user_id: {
            type: 'string',
            example: 'usr_01HXZ9QKPQ8M3T2R5V7W',
          },
          status: {
            type: 'string',
            example: 'pending',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-20T10:30:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  BOOKMARKS
      // ════════════════════════════════════
      BookmarkResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'bmk_01HXZ9QKPQ8M3T2R5V7W',
          },
          user_id: {
            type: 'string',
            example: 'usr_01HXZ9QKPQ8M3T2R5V7W',
          },
          job_id: {
            type: 'string',
            example: 'job_01HXZ9QKPQ8M3T2R5V7W',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-18T14:00:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  PROFILE
      // ════════════════════════════════════
      ProfileResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'usr_01HXZ9QKPQ8M3T2R5V7W',
          },
          name: {
            type: 'string',
            example: 'Budi Santoso',
          },
          email: {
            type: 'string',
            example: 'budi.santoso@example.com',
          },
          role: {
            type: 'string',
            example: 'jobseeker',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-15T08:30:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  DOCUMENTS
      // ════════════════════════════════════
      DocumentResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'doc_01HXZ9QKPQ8M3T2R5V7W',
          },
          filename: {
            type: 'string',
            example: 'CV_Budi_Santoso_2025.pdf',
          },
          url: {
            type: 'string',
            example: 'http://localhost:3000/documents/CV_Budi_Santoso_2025.pdf',
          },
          mimetype: {
            type: 'string',
            example: 'application/pdf',
          },
          size: {
            type: 'integer',
            example: 204800,
            description: 'Ukuran file dalam bytes',
          },
          uploaded_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-16T11:00:00.000Z',
          },
        },
      },

      // ════════════════════════════════════
      //  GENERIC RESPONSES
      // ════════════════════════════════════
      SuccessMessageResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'success',
          },
          message: {
            type: 'string',
            example: 'Operasi berhasil dilakukan',
          },
        },
      },

      ErrorResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'fail',
          },
          message: {
            type: 'string',
            example: 'Terjadi kesalahan pada server',
          },
        },
      },

      ValidationErrorResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'fail',
          },
          message: {
            type: 'string',
            example: '"email" must be a valid email',
          },
        },
      },

      UnauthorizedResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'fail',
          },
          message: {
            type: 'string',
            example: 'Unauthorized — token tidak valid atau sudah kadaluarsa',
          },
        },
      },

      NotFoundResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'fail',
          },
          message: {
            type: 'string',
            example: 'Data tidak ditemukan',
          },
        },
      },
    },

    // ── Reusable Parameters ─────────────────────────────────────────────────
    parameters: {
      IdPathParam: {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string',
          example: 'job_01HXZ9QKPQ8M3T2R5V7W',
        },
        description: 'ID resource yang dituju',
      },
    },

    // ── Reusable Responses ──────────────────────────────────────────────────
    responses: {
      Unauthorized: {
        description: '🔒 Unauthorized — Token tidak ada atau tidak valid',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UnauthorizedResponse' },
          },
        },
      },
      NotFound: {
        description: '🔍 Not Found — Resource tidak ditemukan',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/NotFoundResponse' },
          },
        },
      },
      ValidationError: {
        description: '⚠️ Bad Request — Validasi input gagal',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ValidationErrorResponse' },
          },
        },
      },
    },
  },

  // ── Paths ────────────────────────────────────────────────────────────────────
  paths: {

    // ════════════════════════════════════════════════════════════════════════
    //  USERS
    // ════════════════════════════════════════════════════════════════════════
    '/users': {
      post: {
        tags: ['👤 Users'],
        summary: 'Register pengguna baru',
        description: 'Membuat akun pengguna baru. Role tersedia: `jobseeker`, `employer`, `admin`.',
        operationId: 'registerUser',
        requestBody: {
          required: true,
          description: 'Data pendaftaran pengguna baru',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterUserRequest' },
              examples: {
                jobseeker: {
                  summary: '👷 Daftar sebagai Jobseeker',
                  value: {
                    name: 'Budi Santoso',
                    email: 'budi.santoso@example.com',
                    password: 'password123',
                    role: 'jobseeker',
                  },
                },
                employer: {
                  summary: '🏢 Daftar sebagai Employer',
                  value: {
                    name: 'Siti Rahayu',
                    email: 'siti.rahayu@perusahaan.co.id',
                    password: 'hr_secure_pass',
                    role: 'employer',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: '✅ User berhasil dibuat',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserResponse' },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
        },
      },
    },

    '/users/{id}': {
      get: {
        tags: ['👤 Users'],
        summary: 'Ambil data user berdasarkan ID',
        description: 'Mengembalikan data user publik berdasarkan ID.',
        operationId: 'getUserById',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID pengguna',
            schema: {
              type: 'string',
              example: 'usr_01HXZ9QKPQ8M3T2R5V7W',
            },
          },
        ],
        responses: {
          200: {
            description: '✅ Data user ditemukan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserResponse' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  AUTHENTICATIONS
    // ════════════════════════════════════════════════════════════════════════
    '/authentications': {
      post: {
        tags: ['🔐 Authentications'],
        summary: 'Login — dapatkan access & refresh token',
        description: 'Autentikasi pengguna dengan email dan password. Kembalikan `accessToken` (1 jam) dan `refreshToken` (7 hari).',
        operationId: 'login',
        requestBody: {
          required: true,
          description: 'Kredensial login',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
              examples: {
                jobseeker: {
                  summary: '👷 Login sebagai Jobseeker',
                  value: {
                    email: 'budi.santoso@example.com',
                    password: 'password123',
                  },
                },
                employer: {
                  summary: '🏢 Login sebagai Employer',
                  value: {
                    email: 'siti.rahayu@perusahaan.co.id',
                    password: 'hr_secure_pass',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '✅ Login berhasil',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' },
              },
            },
          },
          400: {
            description: '❌ Kredensial tidak valid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  status: 'fail',
                  message: 'Email atau password salah',
                },
              },
            },
          },
        },
      },

      put: {
        tags: ['🔐 Authentications'],
        summary: 'Refresh access token',
        description: 'Mendapatkan access token baru menggunakan refresh token yang masih valid.',
        operationId: 'refreshToken',
        requestBody: {
          required: true,
          description: 'Refresh token yang masih valid',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RefreshTokenRequest' },
              examples: {
                default: {
                  summary: 'Contoh refresh token',
                  value: {
                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfMDFIWFo5UUtQUThNM1QyUjVWN1ciLCJpYXQiOjE3MDU5OTIyMDAsImV4cCI6MTcwNjU5NzAwMH0.dummyRefreshTokenSignature',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '✅ Token berhasil diperbarui',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' },
              },
            },
          },
          400: {
            description: '❌ Refresh token tidak valid atau sudah kadaluarsa',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },

      delete: {
        tags: ['🔐 Authentications'],
        summary: 'Logout — invalidate refresh token',
        description: 'Menghapus sesi pengguna dengan cara me-invalidate refresh token. Memerlukan access token pada header.',
        operationId: 'logout',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Refresh token yang akan di-invalidate',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LogoutRequest' },
              examples: {
                default: {
                  summary: 'Contoh logout',
                  value: {
                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfMDFIWFo5UUtQUThNM1QyUjVWN1ciLCJpYXQiOjE3MDU5OTIyMDAsImV4cCI6MTcwNjU5NzAwMH0.dummyRefreshTokenSignature',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '✅ Logout berhasil',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' },
                example: {
                  status: 'success',
                  message: 'Logout berhasil',
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  JOBS
    // ════════════════════════════════════════════════════════════════════════
    '/jobs': {
      get: {
        tags: ['💼 Jobs'],
        summary: 'Ambil semua lowongan pekerjaan',
        description: 'Mengembalikan daftar seluruh lowongan pekerjaan yang tersedia. Endpoint publik, tidak memerlukan autentikasi.',
        operationId: 'getAllJobs',
        responses: {
          200: {
            description: '✅ Daftar lowongan berhasil diambil',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/JobResponse' },
                },
                example: [
                  {
                    id: 'job_01HXZ9QKPQ8M3T2R5V7W',
                    title: 'Backend Developer (Node.js)',
                    description: 'Kami mencari Backend Developer berpengalaman...',
                    category_id: 'cat_01HXZ9QKPQ8M3T2R5V7W',
                    company_id: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
                    salary_min: 8000000,
                    salary_max: 15000000,
                    job_type: 'fulltime',
                    experience_level: 'mid',
                    location_type: 'hybrid',
                    location_city: 'Jakarta Selatan',
                    is_salary_visible: true,
                    status: 'open',
                    created_at: '2025-01-15T09:00:00.000Z',
                  },
                  {
                    id: 'job_02HXZ9QKPQ8M3T2R5V8X',
                    title: 'Frontend Developer (React)',
                    description: 'Bergabunglah sebagai Frontend Developer...',
                    category_id: 'cat_01HXZ9QKPQ8M3T2R5V7W',
                    company_id: 'cmp_02HXZ9QKPQ8M3T2R5V8X',
                    salary_min: 7000000,
                    salary_max: 12000000,
                    job_type: 'fulltime',
                    experience_level: 'junior',
                    location_type: 'remote',
                    location_city: null,
                    is_salary_visible: false,
                    status: 'open',
                    created_at: '2025-01-16T10:00:00.000Z',
                  },
                ],
              },
            },
          },
        },
      },

      post: {
        tags: ['💼 Jobs'],
        summary: 'Buat lowongan pekerjaan baru',
        description: 'Membuat lowongan pekerjaan baru. Hanya dapat diakses oleh pengguna dengan role `employer` atau `admin`.',
        operationId: 'createJob',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Data lowongan pekerjaan yang akan dibuat',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateJobRequest' },
              examples: {
                fulltime_hybrid: {
                  summary: '💼 Fulltime Hybrid di Jakarta',
                  value: {
                    title: 'Backend Developer (Node.js)',
                    description: 'Kami mencari Backend Developer berpengalaman dalam Node.js, Express, dan PostgreSQL. Bertanggung jawab membangun dan memelihara REST API yang handal dan skalabel.',
                    category_id: 'cat_01HXZ9QKPQ8M3T2R5V7W',
                    company_id: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
                    salary_min: 8000000,
                    salary_max: 15000000,
                    job_type: 'fulltime',
                    experience_level: 'mid',
                    location_type: 'hybrid',
                    location_city: 'Jakarta Selatan',
                    is_salary_visible: true,
                    status: 'open',
                  },
                },
                remote_freelance: {
                  summary: '🏠 Freelance Remote',
                  value: {
                    title: 'UI/UX Designer Freelance',
                    description: 'Mencari desainer UI/UX untuk proyek 3 bulan. Pengalaman dengan Figma dan design system diperlukan.',
                    category_id: 'cat_02HXZ9QKPQ8M3T2R5V8X',
                    company_id: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
                    salary_min: 5000000,
                    salary_max: 8000000,
                    job_type: 'freelance',
                    experience_level: 'senior',
                    location_type: 'remote',
                    location_city: null,
                    is_salary_visible: true,
                    status: 'open',
                  },
                },
                internship: {
                  summary: '🎓 Internship (Magang)',
                  value: {
                    title: 'Software Engineering Intern',
                    description: 'Program magang 6 bulan untuk mahasiswa S1 Teknik Informatika atau Ilmu Komputer. Dibimbing oleh senior engineer.',
                    category_id: 'cat_01HXZ9QKPQ8M3T2R5V7W',
                    company_id: 'cmp_02HXZ9QKPQ8M3T2R5V8X',
                    salary_min: 1500000,
                    salary_max: 3000000,
                    job_type: 'internship',
                    experience_level: 'junior',
                    location_type: 'onsite',
                    location_city: 'Bandung',
                    is_salary_visible: true,
                    status: 'open',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: '✅ Lowongan berhasil dibuat',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/JobResponse' },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/jobs/{id}': {
      get: {
        tags: ['💼 Jobs'],
        summary: 'Ambil lowongan berdasarkan ID',
        description: 'Mengembalikan detail satu lowongan berdasarkan ID. Endpoint publik.',
        operationId: 'getJobById',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lowongan',
            schema: { type: 'string', example: 'job_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Detail lowongan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/JobResponse' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      put: {
        tags: ['💼 Jobs'],
        summary: 'Update lowongan berdasarkan ID',
        description: 'Memperbarui data lowongan pekerjaan. Hanya dapat dilakukan oleh pemilik lowongan atau admin.',
        operationId: 'updateJobById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lowongan yang akan diupdate',
            schema: { type: 'string', example: 'job_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        requestBody: {
          required: true,
          description: 'Data lowongan yang akan diperbarui',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateJobRequest' },
              examples: {
                update_salary: {
                  summary: '💰 Update gaji dan status',
                  value: {
                    title: 'Backend Developer (Node.js) — Senior',
                    description: 'Posisi diperbarui untuk level Senior. Tanggung jawab mencakup arsitektur sistem dan mentoring junior developer.',
                    category_id: 'cat_01HXZ9QKPQ8M3T2R5V7W',
                    company_id: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
                    salary_min: 15000000,
                    salary_max: 25000000,
                    job_type: 'fulltime',
                    experience_level: 'senior',
                    location_type: 'hybrid',
                    location_city: 'Jakarta Selatan',
                    is_salary_visible: true,
                    status: 'open',
                  },
                },
                close_job: {
                  summary: '🔒 Tutup lowongan',
                  value: {
                    title: 'Backend Developer (Node.js)',
                    description: 'Posisi ini sudah terisi.',
                    category_id: 'cat_01HXZ9QKPQ8M3T2R5V7W',
                    company_id: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
                    salary_min: 8000000,
                    salary_max: 15000000,
                    job_type: 'fulltime',
                    experience_level: 'mid',
                    location_type: 'hybrid',
                    location_city: 'Jakarta Selatan',
                    is_salary_visible: false,
                    status: 'closed',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '✅ Lowongan berhasil diperbarui',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/JobResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      delete: {
        tags: ['💼 Jobs'],
        summary: 'Hapus lowongan berdasarkan ID',
        description: 'Menghapus lowongan pekerjaan secara permanen. Hanya dapat dilakukan oleh pemilik atau admin.',
        operationId: 'deleteJobById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lowongan yang akan dihapus',
            schema: { type: 'string', example: 'job_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Lowongan berhasil dihapus',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' },
                example: { status: 'success', message: 'Lowongan berhasil dihapus' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    '/jobs/category/{id}': {
      get: {
        tags: ['💼 Jobs'],
        summary: 'Ambil lowongan berdasarkan kategori',
        description: 'Mengembalikan semua lowongan yang masuk dalam kategori tertentu.',
        operationId: 'getJobsByCategoryId',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID kategori',
            schema: { type: 'string', example: 'cat_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Daftar lowongan berdasarkan kategori',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/JobResponse' },
                },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    '/jobs/company/{id}': {
      get: {
        tags: ['💼 Jobs'],
        summary: 'Ambil lowongan berdasarkan perusahaan',
        description: 'Mengembalikan semua lowongan yang dibuka oleh perusahaan tertentu.',
        operationId: 'getJobsByCompanyId',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID perusahaan',
            schema: { type: 'string', example: 'cmp_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Daftar lowongan berdasarkan perusahaan',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/JobResponse' },
                },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  CATEGORIES
    // ════════════════════════════════════════════════════════════════════════
    '/categories': {
      get: {
        tags: ['🗂️ Categories'],
        summary: 'Ambil semua kategori pekerjaan',
        description: 'Mengembalikan daftar seluruh kategori pekerjaan. Endpoint publik.',
        operationId: 'getAllCategories',
        responses: {
          200: {
            description: '✅ Daftar kategori',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/CategoryResponse' },
                },
                example: [
                  { id: 'cat_01HXZ9QKPQ8M3T2R5V7W', name: 'Teknologi Informasi', created_at: '2025-01-10T07:00:00.000Z' },
                  { id: 'cat_02HXZ9QKPQ8M3T2R5V8X', name: 'Desain & Kreatif', created_at: '2025-01-10T07:05:00.000Z' },
                  { id: 'cat_03HXZ9QKPQ8M3T2R5V9Y', name: 'Marketing & Sales', created_at: '2025-01-10T07:10:00.000Z' },
                  { id: 'cat_04HXZ9QKPQ8M3T2R5VAZ', name: 'Keuangan & Akuntansi', created_at: '2025-01-10T07:15:00.000Z' },
                ],
              },
            },
          },
        },
      },

      post: {
        tags: ['🗂️ Categories'],
        summary: 'Buat kategori baru',
        description: 'Menambahkan kategori pekerjaan baru. Hanya dapat diakses oleh admin.',
        operationId: 'createCategory',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Nama kategori yang akan dibuat',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCategoryRequest' },
              examples: {
                tech: {
                  summary: '💻 Kategori IT',
                  value: { name: 'Teknologi Informasi' },
                },
                design: {
                  summary: '🎨 Kategori Desain',
                  value: { name: 'Desain & Kreatif' },
                },
                hr: {
                  summary: '👥 Kategori HR',
                  value: { name: 'Human Resources' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: '✅ Kategori berhasil dibuat',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CategoryResponse' },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/categories/{id}': {
      get: {
        tags: ['🗂️ Categories'],
        summary: 'Ambil kategori berdasarkan ID',
        description: 'Mengembalikan data kategori berdasarkan ID.',
        operationId: 'getCategoryById',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID kategori',
            schema: { type: 'string', example: 'cat_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Data kategori',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CategoryResponse' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      put: {
        tags: ['🗂️ Categories'],
        summary: 'Update kategori berdasarkan ID',
        description: 'Memperbarui nama kategori. Hanya dapat dilakukan oleh admin.',
        operationId: 'updateCategoryById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID kategori yang akan diupdate',
            schema: { type: 'string', example: 'cat_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        requestBody: {
          required: true,
          description: 'Nama kategori yang baru',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCategoryRequest' },
              examples: {
                rename: {
                  summary: '✏️ Ganti nama kategori',
                  value: { name: 'IT & Software Engineering' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '✅ Kategori berhasil diperbarui',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CategoryResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      delete: {
        tags: ['🗂️ Categories'],
        summary: 'Hapus kategori berdasarkan ID',
        description: 'Menghapus kategori secara permanen. Hanya dapat dilakukan oleh admin.',
        operationId: 'deleteCategoryById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID kategori yang akan dihapus',
            schema: { type: 'string', example: 'cat_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Kategori berhasil dihapus',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' },
                example: { status: 'success', message: 'Kategori berhasil dihapus' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  COMPANIES
    // ════════════════════════════════════════════════════════════════════════
    '/companies': {
      get: {
        tags: ['🏢 Companies'],
        summary: 'Ambil semua perusahaan',
        description: 'Mengembalikan daftar seluruh perusahaan yang terdaftar. Endpoint publik.',
        operationId: 'getAllCompanies',
        responses: {
          200: {
            description: '✅ Daftar perusahaan',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/CompanyResponse' },
                },
                example: [
                  {
                    id: 'cmp_01HXZ9QKPQ8M3T2R5V7W',
                    name: 'PT. Teknologi Nusantara',
                    location: 'Jakarta Selatan, DKI Jakarta',
                    description: 'Perusahaan teknologi terkemuka di Indonesia.',
                    created_at: '2025-01-12T08:00:00.000Z',
                  },
                  {
                    id: 'cmp_02HXZ9QKPQ8M3T2R5V8X',
                    name: 'PT. Kreasi Digital Indonesia',
                    location: 'Bandung, Jawa Barat',
                    description: 'Agency kreatif digital dengan fokus pada brand identity.',
                    created_at: '2025-01-13T09:00:00.000Z',
                  },
                ],
              },
            },
          },
        },
      },

      post: {
        tags: ['🏢 Companies'],
        summary: 'Daftarkan perusahaan baru',
        description: 'Mendaftarkan perusahaan baru ke platform. Hanya dapat dilakukan oleh pengguna terautentikasi.',
        operationId: 'createCompany',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Data perusahaan yang akan didaftarkan',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCompanyRequest' },
              examples: {
                tech_company: {
                  summary: '🖥️ Perusahaan Teknologi',
                  value: {
                    name: 'PT. Teknologi Nusantara',
                    location: 'Jakarta Selatan, DKI Jakarta',
                    description: 'PT. Teknologi Nusantara adalah perusahaan teknologi yang bergerak di bidang pengembangan software enterprise dan solusi cloud untuk korporasi di Indonesia.',
                  },
                },
                creative_agency: {
                  summary: '🎨 Creative Agency',
                  value: {
                    name: 'PT. Kreasi Digital Indonesia',
                    location: 'Bandung, Jawa Barat',
                    description: 'Agency kreatif digital yang berfokus pada brand identity, UI/UX design, dan digital marketing untuk startup dan UMKM.',
                  },
                },
                startup: {
                  summary: '🚀 Startup',
                  value: {
                    name: 'Nusatech Startup',
                    location: 'Yogyakarta, DIY',
                    description: 'Startup berbasis teknologi yang mengembangkan platform e-commerce untuk pelaku UMKM di Indonesia.',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: '✅ Perusahaan berhasil didaftarkan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CompanyResponse' },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/companies/{id}': {
      get: {
        tags: ['🏢 Companies'],
        summary: 'Ambil perusahaan berdasarkan ID',
        description: 'Mengembalikan detail perusahaan berdasarkan ID.',
        operationId: 'getCompanyById',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID perusahaan',
            schema: { type: 'string', example: 'cmp_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Detail perusahaan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CompanyResponse' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      put: {
        tags: ['🏢 Companies'],
        summary: 'Update perusahaan berdasarkan ID',
        description: 'Memperbarui data perusahaan. Field yang tidak diisi akan dibiarkan tidak berubah.',
        operationId: 'updateCompanyById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID perusahaan yang akan diupdate',
            schema: { type: 'string', example: 'cmp_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        requestBody: {
          required: true,
          description: 'Field perusahaan yang akan diperbarui (semua opsional)',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateCompanyRequest' },
              examples: {
                update_all: {
                  summary: '✏️ Update semua field',
                  value: {
                    name: 'PT. Teknologi Nusantara Tbk.',
                    location: 'Jakarta Pusat, DKI Jakarta',
                    description: 'Perusahaan teknologi publik terkemuka dengan lebih dari 500 karyawan di seluruh Indonesia.',
                  },
                },
                update_location: {
                  summary: '📍 Update lokasi saja',
                  value: {
                    location: 'Surabaya, Jawa Timur',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '✅ Perusahaan berhasil diperbarui',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CompanyResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      delete: {
        tags: ['🏢 Companies'],
        summary: 'Hapus perusahaan berdasarkan ID',
        description: 'Menghapus data perusahaan secara permanen. Hanya dapat dilakukan oleh admin.',
        operationId: 'deleteCompanyById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID perusahaan yang akan dihapus',
            schema: { type: 'string', example: 'cmp_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Perusahaan berhasil dihapus',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' },
                example: { status: 'success', message: 'Perusahaan berhasil dihapus' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  APPLICATIONS
    // ════════════════════════════════════════════════════════════════════════
    '/applications': {
      get: {
        tags: ['📄 Applications'],
        summary: 'Ambil semua lamaran (admin only)',
        description: 'Mengembalikan seluruh data lamaran dari semua pengguna. Hanya untuk admin.',
        operationId: 'getAllApplications',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: '✅ Daftar semua lamaran',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ApplicationResponse' },
                },
                example: [
                  {
                    id: 'app_01HXZ9QKPQ8M3T2R5V7W',
                    job_id: 'job_01HXZ9QKPQ8M3T2R5V7W',
                    user_id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
                    status: 'pending',
                    created_at: '2025-01-20T10:30:00.000Z',
                  },
                  {
                    id: 'app_02HXZ9QKPQ8M3T2R5V8X',
                    job_id: 'job_02HXZ9QKPQ8M3T2R5V8X',
                    user_id: 'usr_02HXZ9QKPQ8M3T2R5V8X',
                    status: 'interview',
                    created_at: '2025-01-21T11:00:00.000Z',
                  },
                ],
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },

      post: {
        tags: ['📄 Applications'],
        summary: 'Lamar pekerjaan',
        description: 'Mengirim lamaran ke sebuah lowongan pekerjaan. Jobseeker harus terautentikasi.',
        operationId: 'applyJob',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Data lamaran pekerjaan',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateApplicationRequest' },
              examples: {
                apply: {
                  summary: '📝 Kirim lamaran',
                  value: {
                    job_id: 'job_01HXZ9QKPQ8M3T2R5V7W',
                    user_id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
                    status: 'pending',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: '✅ Lamaran berhasil dikirim',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApplicationResponse' },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/applications/{id}': {
      get: {
        tags: ['📄 Applications'],
        summary: 'Ambil lamaran berdasarkan ID',
        description: 'Mengembalikan detail satu lamaran berdasarkan ID-nya.',
        operationId: 'getApplicationById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lamaran',
            schema: { type: 'string', example: 'app_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Detail lamaran',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApplicationResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      put: {
        tags: ['📄 Applications'],
        summary: 'Update status lamaran',
        description: 'Memperbarui data lamaran, termasuk status (misal: mengubah ke `interview` atau `accepted`).',
        operationId: 'updateApplicationById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lamaran yang akan diupdate',
            schema: { type: 'string', example: 'app_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        requestBody: {
          required: true,
          description: 'Data lamaran yang akan diperbarui',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateApplicationRequest' },
              examples: {
                move_to_interview: {
                  summary: '📅 Pindah ke tahap interview',
                  value: {
                    job_id: 'job_01HXZ9QKPQ8M3T2R5V7W',
                    user_id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
                    status: 'interview',
                  },
                },
                accepted: {
                  summary: '✅ Diterima',
                  value: {
                    job_id: 'job_01HXZ9QKPQ8M3T2R5V7W',
                    user_id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
                    status: 'accepted',
                  },
                },
                rejected: {
                  summary: '❌ Ditolak',
                  value: {
                    job_id: 'job_01HXZ9QKPQ8M3T2R5V7W',
                    user_id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
                    status: 'rejected',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '✅ Lamaran berhasil diperbarui',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApplicationResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      delete: {
        tags: ['📄 Applications'],
        summary: 'Hapus lamaran berdasarkan ID',
        description: 'Menghapus lamaran. Hanya dapat dilakukan oleh pelamar sendiri atau admin.',
        operationId: 'deleteApplicationById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lamaran yang akan dihapus',
            schema: { type: 'string', example: 'app_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Lamaran berhasil dihapus',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' },
                example: { status: 'success', message: 'Lamaran berhasil dihapus' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    '/applications/user/{id}': {
      get: {
        tags: ['📄 Applications'],
        summary: 'Ambil lamaran berdasarkan user ID',
        description: 'Mengembalikan semua lamaran yang dikirim oleh user tertentu.',
        operationId: 'getApplicationsByUserId',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID pengguna',
            schema: { type: 'string', example: 'usr_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Daftar lamaran milik user',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ApplicationResponse' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/applications/job/{id}': {
      get: {
        tags: ['📄 Applications'],
        summary: 'Ambil lamaran berdasarkan job ID',
        description: 'Mengembalikan semua pelamar yang melamar pada lowongan tertentu.',
        operationId: 'getApplicationsByJobId',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lowongan',
            schema: { type: 'string', example: 'job_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Daftar pelamar untuk lowongan ini',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ApplicationResponse' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  BOOKMARKS
    // ════════════════════════════════════════════════════════════════════════
    '/bookmarks': {
      get: {
        tags: ['🔖 Bookmarks'],
        summary: 'Ambil semua bookmark milik user',
        description: 'Mengembalikan semua lowongan yang di-bookmark oleh pengguna yang sedang login.',
        operationId: 'getMyBookmarks',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: '✅ Daftar bookmark',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/BookmarkResponse' },
                },
                example: [
                  {
                    id: 'bmk_01HXZ9QKPQ8M3T2R5V7W',
                    user_id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
                    job_id: 'job_01HXZ9QKPQ8M3T2R5V7W',
                    created_at: '2025-01-18T14:00:00.000Z',
                  },
                ],
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/jobs/{id}/bookmark': {
      post: {
        tags: ['🔖 Bookmarks'],
        summary: 'Bookmark sebuah lowongan',
        description: 'Menambahkan lowongan ke daftar bookmark pengguna yang sedang login.',
        operationId: 'createBookmark',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID lowongan yang akan di-bookmark',
            schema: { type: 'string', example: 'job_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          201: {
            description: '✅ Lowongan berhasil di-bookmark',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BookmarkResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    '/jobs/{jobId}/bookmark': {
      delete: {
        tags: ['🔖 Bookmarks'],
        summary: 'Hapus bookmark berdasarkan job ID',
        description: 'Menghapus bookmark berdasarkan job ID milik pengguna yang sedang login.',
        operationId: 'deleteBookmarkByJobId',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'jobId',
            required: true,
            description: 'ID lowongan yang bookmarknya akan dihapus',
            schema: { type: 'string', example: 'job_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Bookmark berhasil dihapus',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' },
                example: { status: 'success', message: 'Bookmark berhasil dihapus' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    '/jobs/{jobId}/bookmark/{bookmarkId}': {
      get: {
        tags: ['🔖 Bookmarks'],
        summary: 'Ambil bookmark berdasarkan job ID dan bookmark ID',
        description: 'Mengembalikan detail bookmark spesifik berdasarkan job ID dan bookmark ID.',
        operationId: 'getBookmarkById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'jobId',
            required: true,
            description: 'ID lowongan',
            schema: { type: 'string', example: 'job_01HXZ9QKPQ8M3T2R5V7W' },
          },
          {
            in: 'path',
            name: 'bookmarkId',
            required: true,
            description: 'ID bookmark',
            schema: { type: 'string', example: 'bmk_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Detail bookmark',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BookmarkResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  PROFILE
    // ════════════════════════════════════════════════════════════════════════
    '/profile': {
      get: {
        tags: ['👤 Profile'],
        summary: 'Ambil profil pengguna yang sedang login',
        description: 'Mengembalikan data profil pengguna berdasarkan access token yang dikirimkan.',
        operationId: 'getMyProfile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: '✅ Data profil pengguna',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProfileResponse' },
                example: {
                  id: 'usr_01HXZ9QKPQ8M3T2R5V7W',
                  name: 'Budi Santoso',
                  email: 'budi.santoso@example.com',
                  role: 'jobseeker',
                  created_at: '2025-01-15T08:30:00.000Z',
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/profile/bookmarks': {
      get: {
        tags: ['👤 Profile'],
        summary: 'Ambil bookmark milik pengguna yang sedang login',
        description: 'Shortcut untuk mengambil daftar bookmark dari pengguna yang sedang aktif (berdasarkan token).',
        operationId: 'getMyProfileBookmarks',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: '✅ Daftar bookmark pengguna aktif',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/BookmarkResponse' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/profile/applications': {
      get: {
        tags: ['👤 Profile'],
        summary: 'Ambil lamaran milik pengguna yang sedang login',
        description: 'Shortcut untuk mengambil semua lamaran pekerjaan dari pengguna yang sedang aktif (berdasarkan token).',
        operationId: 'getMyProfileApplications',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: '✅ Daftar lamaran pengguna aktif',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ApplicationResponse' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ════════════════════════════════════════════════════════════════════════
    //  DOCUMENTS
    // ════════════════════════════════════════════════════════════════════════
    '/documents': {
      get: {
        tags: ['📁 Documents'],
        summary: 'Ambil semua dokumen',
        description: 'Mengembalikan daftar seluruh dokumen yang diunggah. Endpoint publik.',
        operationId: 'getAllDocuments',
        responses: {
          200: {
            description: '✅ Daftar dokumen',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/DocumentResponse' },
                },
                example: [
                  {
                    id: 'doc_01HXZ9QKPQ8M3T2R5V7W',
                    filename: 'CV_Budi_Santoso_2025.pdf',
                    url: 'http://localhost:3000/documents/CV_Budi_Santoso_2025.pdf',
                    mimetype: 'application/pdf',
                    size: 204800,
                    uploaded_at: '2025-01-16T11:00:00.000Z',
                  },
                ],
              },
            },
          },
        },
      },

      post: {
        tags: ['📁 Documents'],
        summary: 'Upload dokumen (CV, portofolio, dll)',
        description: `Mengunggah dokumen menggunakan **multipart/form-data**.

**Format yang didukung:** PDF, DOC, DOCX, PNG, JPG  
**Ukuran maksimum:** 5 MB  
**Field name:** \`document\`

Gunakan tombol **"Choose File"** di bawah untuk memilih file.`,
        operationId: 'uploadDocument',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'File dokumen yang akan diunggah (gunakan field `document`)',
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['document'],
                properties: {
                  document: {
                    type: 'string',
                    format: 'binary',
                    description: 'File dokumen (PDF, DOC, DOCX, PNG, JPG — maks 5 MB)',
                  },
                },
              },
              encoding: {
                document: {
                  contentType: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: '✅ Dokumen berhasil diunggah',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/DocumentResponse' },
                example: {
                  id: 'doc_01HXZ9QKPQ8M3T2R5V7W',
                  filename: 'CV_Budi_Santoso_2025.pdf',
                  url: 'http://localhost:3000/documents/CV_Budi_Santoso_2025.pdf',
                  mimetype: 'application/pdf',
                  size: 204800,
                  uploaded_at: '2025-01-16T11:00:00.000Z',
                },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/documents/{id}': {
      get: {
        tags: ['📁 Documents'],
        summary: 'Ambil dokumen berdasarkan ID',
        description: 'Mengembalikan detail metadata dokumen berdasarkan ID.',
        operationId: 'getDocumentById',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID dokumen',
            schema: { type: 'string', example: 'doc_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Detail dokumen',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/DocumentResponse' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },

      delete: {
        tags: ['📁 Documents'],
        summary: 'Hapus dokumen berdasarkan ID',
        description: 'Menghapus dokumen secara permanen dari server. Hanya pemilik atau admin yang dapat menghapus.',
        operationId: 'deleteDocumentById',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID dokumen yang akan dihapus',
            schema: { type: 'string', example: 'doc_01HXZ9QKPQ8M3T2R5V7W' },
          },
        ],
        responses: {
          200: {
            description: '✅ Dokumen berhasil dihapus',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' },
                example: { status: 'success', message: 'Dokumen berhasil dihapus' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
  },
};

export { swaggerUi, specs };
