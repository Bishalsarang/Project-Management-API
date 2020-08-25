const model = require('./baseModel');
const db = require('../db');
const { tableName } = require('../constants');

require('./task');
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
   * Softdelete user.
   *
   * @param {Integer} userId
   */
  softDelete(userId) {
    console.log(userId);

    return User.update({ id: userId }, { is_deleted: true });
  }
});

// User.forge()
//   .getAllTasks(1)
//   .then((data) => console.log(data));

module.exports = db.model('User', User);
