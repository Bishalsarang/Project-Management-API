const model = require('./baseModel');

const db = require('../db');
const { tableName } = require('../constants');

require('./user');
require('./task');
require('./member');

const Project = model.extend({
  tableName: tableName.projects,

  /**
   * Project belongs to many users.
   */
  users() {
    return this.belongsToMany('User', tableName.members, 'project_id', 'user_id');
  },

  /**
   * Get all the users associated with projectId.
   *
   * @param {Integer} projectId
   */
  getAllUsers(projectId) {
    return Project.getRelated('users', { id: projectId });
  },

  /**
   * Project can have multiple tasks.
   */
  tasks() {
    return this.hasMany('Task', 'project_id');
  },

  /**
   * Get all the tasks associated with Project.
   *
   * @param {Integer} projectId
   */
  getAllTasks(projectId) {
    return Project.getRelated('tasks', { id: projectId });
  },
  /**
   *
   */
  members() {
    return this.hasMany('Member', 'project_id');
  },
  /**
   * Get all members associted with projectId.
   *
   * @param {Integer} projectId
   */
  getAllMembers(projectId) {
    return Project.getRelated(tableName.members, { id: projectId });
  }
});

// Project.forge()
//   .getAllUsers(1)
//   .then((data) => console.log(data));

// Project.forge()
//   .getAllTasks(2)
//   .then((data) => console.log(data));

module.exports = db.model('Project', Project);
