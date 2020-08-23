const knexJs = require('knex');
const bookShelf = require('bookshelf');

const knexConfig = require('./knexfile');

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const db = bookShelf(knex);

module.exports = db;
