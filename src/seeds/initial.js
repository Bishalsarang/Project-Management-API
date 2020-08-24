const { orderedTableNames, tableName } = require('../constants');

const bcrypt = require('bcrypt');

/**
 * Seed the database with default values.
 *
 * @param {Knex} knex Knex instance.
 */
exports.seed = async function (knex) {
  // Empty existing data
  await Promise.all(orderedTableNames.map((table) => knex(table).del()));

  // Store hash of default password
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, parseInt(process.env.SALT_ROUNDS));

  // Create default user credentials
  const user = {
    firstname: process.env.ADMIN_FIRST_NAME || 'admin',
    lastname: process.env.ADMIN_LAST_NAME || 'admin',
    username: process.env.ADMIN_USER_NAME || 'admin',
    password: hashedPassword || 'admin',
    role: 'admin'
  };

  const [createdUser] = await knex(tableName.users).insert(user).returning('*');
};
