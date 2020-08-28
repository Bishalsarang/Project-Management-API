/* eslint-disable camelcase */
const model = require('./baseModel');

const db = require('../db');
const { tableName } = require('../constants');

require('./tag');
require('./task');
require('./member');
require('./project');

const User = model.extend({
  tableName: tableName.users,

  /**
   * User belongs to many projects.
   */
  projects() {
    return this.belongsToMany('Project', 'members', 'user_id', 'project_id');
  },

  /**
   * Get all the projects associated with userId.
   *
   * @param {Integer} userId
   */
  getAllProjects(userId) {
    return User.getRelated('projects', { id: userId });
  },

  /**
   * User may belong to multiple tasks.
   */
  tasks() {
    return this.belongsToMany('Task', 'tags', 'user_id', 'task_id');
  },

  /**
   * Get all the tasks tagged and assigned with userId.
   *
   * @param {Integer} userId
   */
  getAllTasks(userId) {
    return User.getRelated('tasks', { id: userId });
  },
  /**
   * The user can be member of multiple.
   */
  members() {
    return this.hasMany('Member');
  },

  /**
   * Get all the project_ids the user is manager.
   *
   * @param {Integer} userId
   */
  getAllMembers(userId) {
    return User.getRelated(tableName.members, { id: userId });
  },
  /**
   * User can be tagged in multiple.
   */
  tags() {
    return this.hasMany('Tag');
  },
  /**
   * Get all the tags including task id based on userId.
   *
   * @param {Integer} userId
   */
  getAllTags(userId) {
    return User.getRelated(tableName.tags, { id: userId });
  },
  /**
   * Softdelete user.
   *
   * @param {Integer} userId
   */
  softDelete(userId) {
    return User.update({ id: userId }, { is_deleted: true });
  }
});

module.exports = db.model('User', User);
