const httpStatusCodes = require('http-status-codes');
const { getCurrentUserRole } = require('../utils/auth.utils');

/**
 * Check if user is authorized.
 *
 * @param {List} allowedRoles List of String of allowed roles.
 */
const isAuthorized = (allowedRoles = []) => {
  return async (req, res, next) => {
    if (allowedRoles.length && !allowedRoles.includes(await getCurrentUserRole(req))) {
      const err = new Error('Unauthorized Access You must be ' + allowedRoles);

      err.statusCode = httpStatusCodes.UNAUTHORIZED;
      next(err);
    }
    next();
  };
};

module.exports = { isAuthorized };
