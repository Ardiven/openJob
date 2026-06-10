/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    company_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    owner_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    job_type: {
      type: 'TEXT',
      notNull: true,
    },
    experience_level: {
      type: 'TEXT',
      notNull: true,
    },
    location_type: {
      type: 'TEXT',
      notNull: true,
    },
    location_city: {
      type: 'TEXT',
      notNull: false,
    },
    salary_min: {
      type: 'INTEGER',
   
      default: 0,
    },
    salary_max: {
      type: 'INTEGER',
   
      default: 0,
    },
    is_salary_visible: {
      type: 'BOOLEAN',
      default: false,
    },
    status: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('jobs');
};
