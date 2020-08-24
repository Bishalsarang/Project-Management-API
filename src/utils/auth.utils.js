const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Generate JWT from data payload.
 *
 * @param {Object} payload
 * @returns {String} JWT token.
 */
const generateAccessToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15d' });

/**
 * Verify if token is valid.
 *
 * @param {String} token
 * @param {String} SECRET
 *
 * @returns {Boolean}
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

/**
 * Compare hash and password.
 *
 * @param {String} password
 * @param {String} hashedPassword
 * @returns {Boolean}
 */
const comparePassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);

    return result;
  } catch (err) {
    return false;
  }
};

module.exports = {
  verifyToken,
  comparePassword,
  generateAccessToken,
  generateHashedPassword
};
