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
    pgm.createTable('companies', {
        id: {
            type: 'VARCHAR(20)',
            primaryKey: true
        },
        name: {
            type: 'TEXT',
            notNull: true
        },
        location: {
            type: 'TEXT',
            notNull: true
        },
        description: {
            type: 'TEXT',
            notNull: true
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
            default: pgm.func("current_timestamp")
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
            default: pgm.func("current_timestamp")
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('companies');
};
