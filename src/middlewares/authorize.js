const httpStatusCodes = require('http-status-codes');

const { ROLE } = require('../constants');
const { verifyToken, isAuthorizedRole, getToken } = require('../utils/auth.utils');

const isAdmin = async (req, res, next) => {
  const token = getToken(req);

  try {
    if (token) {
      const payload = await verifyToken(token);

      if (!payload) {
        const err = new Error('Invalid Token');

        err.statusCode = httpStatusCodes.UNAUTHORIZED;
        throw err;
      }

      if (!isAuthorizedRole(payload.role, ROLE.admin)) {
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
