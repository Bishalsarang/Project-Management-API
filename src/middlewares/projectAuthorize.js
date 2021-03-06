const httpStatusCodes = require('http-status-codes');
const { ROLE } = require('../constants');
const { getCurrentUserRole, getCurrentUserId } = require('../utils/auth.utils');
const createError = require('http-errors');

// Everyone can read project but only view based on their role
const read = async (req, res, next) => {
  try {
    const role = await getCurrentUserRole(req);

    //  Can view all the projects
    if (role === ROLE.admin || role === ROLE.projectManager) {
      return next();
    }
    req.body.userId = await getCurrentUserId(req);

    return next();
  } catch (err) {
    next(err);
  }
  next();
};

/**
 * Project can be only updated by PM or admin.
 * But PM can update only the project he is assigned.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const update = async (req, res, next) => {
  try {
    const currentRole = await getCurrentUserRole(req);

    if ([ROLE.admin, ROLE.projectManager].includes(currentRole)) {
      return next();
    }

    throw createError(httpStatusCodes.UNAUTHORIZED, 'Unauthorized');
  } catch (err) {
    next(err);
  }
};

/**
 * Only admin can creat a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const create = async (req, res, next) => {
  try {
    const currentRole = await getCurrentUserRole(req);

    if (currentRole === ROLE.admin) {
      return next();
    }

    throw createError(httpStatusCodes.UNAUTHORIZED, 'Unauthorized');
  } catch (err) {
    next(err);
  }
};

/**
 * Only admin can delete a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const del = async (req, res, next) => {
  try {
    const currentRole = await getCurrentUserRole(req);

    if (currentRole === ROLE.admin) {
      return next();
    }

    throw createError(httpStatusCodes.UNAUTHORIZED, 'Unauthorized');
  } catch (err) {
    next(err);
  }
};

module.exports = { create, read, update, del };
