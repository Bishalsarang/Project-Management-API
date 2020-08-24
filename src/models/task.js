const model = require('./baseModel');
const db = require('../db');

const { tableName } = require('../constants');

require('./user');

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
  }
});

// Task.forge()
//   .getProject(3)
//   .then((data) => console.log(data));

module.exports = db.model('Task', Task);
