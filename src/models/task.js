const model = require('./baseModel');
const db = require('../db');
const { tableName } = require('../constants');

const User = require('./user');
const Task = model.extend({
  tableName: tableName.tasks,

  users() {
    return this.belongsToMany(User);
  }
});

module.exports = db.model('Task', Task);
