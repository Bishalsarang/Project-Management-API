const httpStatusCodes = require('http-status-codes');

const { createProjects, getProjects, updateProjects, deleteProjects } = require('../services/project.services');

const { ROLE, SUCCESS_MESSAGE } = require('../constants');

const { verifyToken, getToken, getCurrentUserId, getCurrentUserRole } = require('../utils/auth.utils');

/**
 * Creates a new project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const create = async (req, res, next) => {
  try {
    const result = await createProjects(req.body);

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.write, data: result });
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const result = await getProjects();

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.read, data: result });
  } catch (err) {
    next(err);
  }
};

const readById = async (req, res, next) => {
  try {
    const result = await getProjects({ id: req.params.id });

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.read, data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const id = req.params.id;

  try {
    const currentUserId = await getCurrentUserId(req);
    const role = await getCurrentUserRole(req);

    // Only allow updates the user is assigned to
    if (role !== ROLE.admin && parseInt(id) !== currentUserId) {
      const error = new Error('Unauthorized to update as the project is not assigned to you');

      error.statusCode = httpStatusCodes.UNAUTHORIZED;
      throw error;
    }
    const result = await updateProjects({ id }, req.body);

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.update, data: result });
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const result = await deleteProjects(req.params.id);

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.delete, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, readAll, readById, update, del };
