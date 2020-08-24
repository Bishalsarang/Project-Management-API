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
   * @param userId
   */
  getAllProjects: (userId) => {
    return User.getRelated('projects', { id: userId });
  },

  tasks() {
    return this.hasMany('Task', 'assignee_id');
  }
});

User.forge()
  .getAllProjects(7)
  .then((data) => console.log(data));

module.exports = db.model('User', User);
