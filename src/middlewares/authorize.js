const httpStatusCodes = require('http-status-codes');

const { verifyToken } = require('../utils/auth.utils');

const isAdmin = async (req, res, next) => {
  const token =
    req.headers['auth-token'] || req.headers['authorization'] || req.headers['token'] || req.headers['x-access-token'];

  try {
    if (token) {
      const payload = await verifyToken(token);

      if (!payload || payload.role !== 'admin') {
        const err = new Error('Not authorized. Only admin is allowed to do this operation');

        err.statusCode = httpStatusCodes.UNAUTHORIZED;
        throw err;
      }

      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isAdmin };
