const model = require('./baseModel');
const db = require('../db');

const { tableName } = require('../constants');

require('./user');

const Member = model.extend({
  tableName: tableName.members,

  users() {
    return this.belongsTo('User');
  },

  getUser(memberId) {
    return Member.getRelated(tableName.users, { id: memberId });
  }
});

// Member.forge()
//   .getUser(2)
//   .then((data) => console.log(data));

module.exports = db.model('Member', Member);
