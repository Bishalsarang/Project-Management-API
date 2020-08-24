const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Generate JWT from data payload.
 *
 * @param {Object} payload
 */
const generateAccessToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15d' });

/**
 * Verify if token is valid.
 *
 * @param {String} token
 * @param {String} SECRET
 */
const verifyToken = async (token, SECRET = process.env.SECRET_KEY) => {
  const result = await jwt.verify(token, SECRET);

  return result;
};

/**
 * Generate hashedPassword from plainPassword.
 *
 * @param {String} plainPassword
 */
const generateHashedPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, parseInt(process.env.SALT_ROUNDS) || 10);

  return hashedPassword;
};

module.exports = {
  verifyToken,
  generateAccessToken,
  generateHashedPassword
};
