const model = require('./baseModel');
const db = require('../db');

const { tableName } = require('../constants');

require('./task');

const Comment = model.extend({
  tableName: tableName.comments,

  /**
   * Comment belongs to a single task.
   */
  tasks() {
    return this.belongsTo('Task');
  },

  /**
   *
   * @param {Integer} commentId
   */
  getTask(commentId) {
    return Comment.getRelated('tasks', { id: commentId });
  }
});

module.exports = db.model('Comment', Comment);
