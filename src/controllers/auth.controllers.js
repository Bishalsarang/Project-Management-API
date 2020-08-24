const httpStatus = require('http-status-codes');

const { generateHashedPassword } = require('../utils/auth.utils');
const dbError = require('../utils/dbErrors.utils');

const User = require('../models/user');

const register = async (req, res, next) => {
  const { firstname, lastname, username, password, role } = req.body;

  const hashedPassword = await generateHashedPassword(password);
  const userData = { firstname, lastname, username, password: hashedPassword, role };

  try {
    const createdUser = await User.create(userData);

    return res.status(httpStatus.CREATED).json(createdUser);
  } catch (err) {
    return next(dbError(err));
  }
};

module.exports = { register };
