const model = require('./baseModel');
const db = require('../db');

const { tableName } = require('../constants');

require('./user');
require('./project');

const Member = model.extend({
  tableName: tableName.members,
  /**
   * Every member is a user.
   */
  users() {
    return this.belongsTo('User');
  },
  /**
   * Get User associated with the memberId.
   *
   * @param {Integer} memberId
   */
  getUser(memberId) {
    return Member.getRelated(tableName.users, { id: memberId });
  },
  /**
   * Every member belongs to a project.
   */
  projects() {
    return this.belongsTo('Project');
  },
  /**
   *
   * @param {Integer} memberId
   */
  getProject(memberId) {
    return Member.getRelated(tableName.projects, { id: memberId });
  }
});

module.exports = db.model('Member', Member);
