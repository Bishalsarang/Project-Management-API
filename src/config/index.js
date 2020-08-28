const dotenv = require('dotenv');

/**
 * Initialize environment variables.
 */
// Note : knexfile requires to explicitly provide path to .env files for migrations and seeds
dotenv.config({ path: __dirname + '/../../.env' });
