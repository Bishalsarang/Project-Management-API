const db = require('../db');

const User = db.model('User', {
  tableName: 'users'
});

module.exports = User;
