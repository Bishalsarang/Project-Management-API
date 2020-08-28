const model = require('./baseModel');
const db = require('../db');

const { tableName } = require('../constants');

require('./tag');
require('./user');
require('./project');
require('./comment');

const Task = model.extend({
  tableName: tableName.tasks,

  /**
   * Task belongs to many users i.e tagged and assigned.
   */
  users() {
    return this.belongsToMany('User', 'tags', 'task_id', 'user_id');
  },

  /**
   * Get all the assigned and tagged users for taskId.
   *
   * @param {Integer} taskId
   */
  getAllUsers(taskId) {
    return Task.getRelated('users', { id: taskId });
  },

  /**
   * Task belong to a single project.
   */
  projects() {
    return this.belongsTo('Project');
  },

  /**
   * Get the project associated with taskId.
   *
   * @param {Integer} taskId
   */
  getProject(taskId) {
    return Task.getRelated('projects', { id: taskId });
  },

  /**
   * Task can have many comments.
   */
  comments() {
    return this.hasMany('Comment', 'task_id');
  },

  /**
   * Get all the comments fot task with taskId.
   *
   * @param {Integer} taskId
   */
  getAllComments(taskId) {
    return Task.getRelated('comments', { id: taskId });
  },

  /**
   * A task has multiple tags.
   */
  tags() {
    return this.hasMany('Tag', 'task_id');
  },

  /**
   * Get all the tags associated with taskId.
   *
   * @param {Integer} taskId
   */
  getAllTags(taskId) {
    return Task.getRelated(tableName.tags, { id: taskId });
  }
});

// Task.forge()
//   .getAllComments(2)
//   .then((data) => console.log(data));

module.exports = db.model('Task', Task);
