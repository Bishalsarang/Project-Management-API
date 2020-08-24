const { tableName } = require('../constants');

exports.up = async function (knex) {
  // Create Users Table
  await knex.schema.createTable(tableName.users, (table) => {
    table.increments().primary();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.text('user_name').notNullable().unique();
    table.text('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.enu('role', ['admin', 'project_manager', 'engineer', 'team_leader']);
  });

//   Create Project table
  await knex.schema.createTable(tableName.users, (table) => {
   table.increments().primary();
   table.text('title', 50).notNullable();
   table.text('description').notNullable();
   table.integer('manager_id').unsigned().notNullable();

   table.foreign('manager_id').references('id').inTable(tableName.users);
   
   table.timestamp('created_at').defaultTo(knex.fn.now());
};

exports.down = async function (knex) {
  await knex.schema.dropTable(tableName.users);
};
