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

// Task.forge()
//   .getProject(3)
//   .then((data) => console.log(data));

// Comment.forge()
//   .getTask(1)
//   .then((data) => console.log(data));

module.exports = db.model('Comment', Comment);
