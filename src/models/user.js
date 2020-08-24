const model = require('./baseModel');
const { tableName } = require('../constants');

const User = model.extend({
  tableName: tableName.users
});

module.exports = User;
