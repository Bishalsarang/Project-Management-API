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
 * Returns payload if token is valid.
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

/**
 * Returns token from request header.
 *
 * @param {Object} req Request object.
 * @returns {String} Token String.
 */
const getToken = (req) => {
  if (!req) {
    return null;
  }

  const token =
    req.headers['auth-token'] || req.headers['authorization'] || req.headers['token'] || req.headers['x-access-token'];

  if (!token) {
    return null;
  }

  return token;
};

/**
 * Get current user role from request object.
 *
 * @param {Object} req Request Object.
 */
const getCurrentUserRole = async (req) => {
  const token = getToken(req);

  if (!token) {
    return null;
  }

  const { role } = await verifyToken(token);

  return role;
};

const isAuthorizedRole = (currentSessionRole, expectedRole) => {
  return currentSessionRole === expectedRole;
};

module.exports = {
  getToken,
  verifyToken,
  comparePassword,
  isAuthorizedRole,
  getCurrentUserRole,
  generateAccessToken,
  generateHashedPassword
};
