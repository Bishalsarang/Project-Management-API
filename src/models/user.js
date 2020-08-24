const model = require('./baseModel');
const { tableName } = require('../constants');

const User = model.extend({
  tableName: tableName.users
});

// // User.forge({
// //   firstname: 'ram',
// //   lastname: 'panthi',
// //   username: 'panthi',
// //   password: '$2b$10$0OubiSJ076aoHt4ey8o2Cu7skDOvwrU5pRQvi4b2V/HRKBGcZ7Ae6',
// //   role: 'admin'
// // })
// //   .save()
// //   .then(function (u) {
// //     console.log('User saved:', u.get('username'));
// //   });
// const user = new User();

// user.create({
//   firstname: 'ramu',
//   lastname: 'panthi',
//   username: 'panthi',
//   password: '$2b$10$0OubiSJ076aoHt4ey8o2Cu7skDOvwrU5pRQvi4b2V/HRKBGcZ7Ae6',
//   role: 'admin'
// });
module.exports = User;
