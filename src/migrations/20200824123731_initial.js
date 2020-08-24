const { tableName } = require('../constants');
const logger = require('../utils/logger');

const MAX_TITlE_LENGTH = 50;

exports.up = async function (knex) {
  // Create Users Table
  try {
    await knex.schema.createTable(tableName.users, (table) => {
      table.increments().primary();
      table.text('firstname').notNullable();
      table.text('lastname').notNullable();
      table.text('username').notNullable().unique();
      table.text('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.enu('role', ['admin', 'project_manager', 'engineer', 'team_leader']);
    });
  } catch (err) {
    logger.error('Unable to create users table', err);
  }

  //   Create Project table
  await knex.schema.createTable(tableName.projects, (table) => {
    table.increments().primary();
    table.text('title', MAX_TITlE_LENGTH).notNullable();
    table.text('description').notNullable();
    table.integer('manager_id').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign('manager_id').references('id').inTable(tableName.users).onDelete('cascade');
  });

  //    Create members table
  await knex.schema.createTable(tableName.members, (table) => {
    table.increments().primary();

    table.integer('user_id').notNullable();
    table.integer('project_id').notNullable();

    table.foreign('user_id').references('id').inTable(tableName.users).onDelete('cascade');
    table.foreign('project_id').references('id').inTable(tableName.projects).onDelete('cascade');
  });

  //    Create tasks table
  await knex.schema.createTable(tableName.tasks, (table) => {
    table.increments().primary();

    table.integer('assignee_id').notNullable();
    table.integer('project_id').notNullable();
    table.text('title', MAX_TITlE_LENGTH).notNullable();
    table.text('description').notNullable();
    table.datetime('deadline').notNullable();

    table.foreign('assignee_id').references('id').inTable(tableName.users).onDelete('cascade');
    table.foreign('project_id').references('id').inTable(tableName.projects).onDelete('cascade');
  });

  //   Create comments table
  await knex.schema.createTable(tableName.comments, (table) => {
    table.increments().primary();

    table.integer('task_id').notNullable();
    table.integer('commenter_id').notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign('task_id').references('id').inTable(tableName.tasks).onDelete('cascade');
    table.foreign('commenter_id').references('id').inTable(tableName.users).onDelete('cascade');
  });

  //   Create tags table
  await knex.schema.createTable(tableName.tags, (table) => {
    table.increments().primary();

    table.integer('user_id').notNullable();
    table.integer('task_id').notNullable();

    table.foreign('task_id').references('id').inTable(tableName.tasks).onDelete('cascade');
    table.foreign('user_id').references('id').inTable(tableName.users).onDelete('cascade');
  });
};

exports.down = async function (knex) {
  // Since knex doesn't allow delete CASCADE, we can either use raw sql or delete in order of dependency
  await Promise.all(
    [
      tableName.tags,
      tableName.comments,
      tableName.tasks,
      tableName.members,
      tableName.projects,
      tableName.users
    ].map((table) => knex.schema.dropTable(table))
  );
};
