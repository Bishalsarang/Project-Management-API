const model = require('./baseModel');
const db = require('../db');

const { tableName } = require('../constants');

require('./user');
require('./task');

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
   * @param projectId
   */
  getAllUsers: (projectId) => {
    return Project.getRelated('users', { id: projectId });
  },

  tasks() {
    return this.hasMany('Task', 'project_id');
  }
});

// Project.forge()
//   .getAllUsers(1)
//   .then((data) => console.log(data));

module.exports = db.model('Project', Project);
