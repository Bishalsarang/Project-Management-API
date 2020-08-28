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

// Member.forge()
//   .getUser(2)
//   .then((data) => console.log(data));

// Member.forge()
//   .getProject(2)
//   .then((data) => console.log(data));

module.exports = db.model('Member', Member);
