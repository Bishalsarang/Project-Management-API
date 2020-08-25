const httpStatusCodes = require('http-status-codes');

const { verifyToken, isAuthorizedRole } = require('../utils/auth.utils');

const isAdmin = async (req, res, next) => {
  const token =
    req.headers['auth-token'] || req.headers['authorization'] || req.headers['token'] || req.headers['x-access-token'];

  try {
    if (token) {
      const payload = await verifyToken(token);

      if (!payload) {
        const err = new Error('Invalid Token');

        err.statusCode = httpStatusCodes.UNAUTHORIZED;
        throw err;
      }

      if (!isAuthorizedRole(payload.role, 'admin')) {
        const err = new Error('Unauthorized Access');

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
