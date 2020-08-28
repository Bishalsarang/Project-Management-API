const model = require('./baseModel');
const db = require('../db');

const { tableName } = require('../constants');

require('./user');
require('./task');

const Tag = model.extend({
  tableName: tableName.tags,
  /**
   * Every tagged user belongs to User.
   */
  users() {
    return this.belongsTo('User');
  },
  /**
   * Get User associated to tagId.
   *
   * @param {Integer} tagId
   */
  getUser(tagId) {
    return Tag.getRelated(tableName.users, { id: tagId });
  },
  /**
   * Every tag belongs to a task.
   */
  tasks() {
    return this.belongsTo('Task');
  },
  /**
   * Get the task the given tag belongs to.
   *
   * @param {Integer} tagId
   */
  getTask(tagId) {
    return Tag.getRelated(tableName.tasks, { id: tagId });
  }
});

module.exports = db.model('Tag', Tag);
