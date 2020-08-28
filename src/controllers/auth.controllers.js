const httpStatus = require('http-status-codes');

const dbError = require('../utils/dbErrors.utils');
const { generateHashedPassword, comparePassword, generateAccessToken } = require('../utils/auth.utils');

const User = require('../models/user');

/**
 * Register a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const register = async (req, res, next) => {
  const { firstname, lastname, username, password, role } = req.body;

  const hashedPassword = await generateHashedPassword(password);
  const userData = { firstname, lastname, username, password: hashedPassword, role };

  try {
    const { username, role } = await User.create(userData);

    return res
      .status(httpStatus.CREATED)
      .json({ success: true, message: 'Account Successfully created', createdUser: { username, role } });
  } catch (err) {
    return next(dbError(err));
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ username });

    const { password: hashedPassword, role, id } = userData;
    const isPasswordMatched = await comparePassword(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new Error('Username or password not correct');
    }
    const token = generateAccessToken({ id, username, role });

    return res.status(httpStatus.OK).json({ success: true, message: 'Successfully Logged In', token, username, role });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
