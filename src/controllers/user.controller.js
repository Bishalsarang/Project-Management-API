const httpStatusCodes = require('http-status-codes');

const { getCurrentUserRole, isAuthorizedRole } = require('../utils/auth.utils');
const { ROLE } = require('../constants');
const { getUsers, updateUsers, deleteUsers } = require('../services/user.services');

const readAll = async (req, res, next) => {
  const role = await getCurrentUserRole(req);

  try {
    if (!role) {
      throw new Error('Error while getting users');
    }

    if (!isAuthorizedRole(role, ROLE.admin)) {
      const err = new Error('Unauthorized access');

      err.statusCode = httpStatusCodes.UNAUTHORIZED;
      throw err;
    }

    res.json({ success: true, data: await getUsers() });
  } catch (err) {
    next(err);
  }
};

const readById = async (req, res, next) => {
  const role = await getCurrentUserRole(req);

  try {
    if (!role) {
      throw new Error('Error while getting users');
    }

    if (!isAuthorizedRole(role, ROLE.admin)) {
      const err = new Error('Unauthorized access');

      err.statusCode = httpStatusCodes.UNAUTHORIZED;
      throw err;
    }

    res.json({ success: true, data: await getUsers({ id: req.params.id }) });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const role = await getCurrentUserRole(req);

  try {
    if (!role) {
      throw new Error('Error while getting users');
    }

    if (!isAuthorizedRole(role, ROLE.admin)) {
      const err = new Error('Unauthorized access');

      err.statusCode = httpStatusCodes.UNAUTHORIZED;
      throw err;
    }

    res.json({ success: true, data: await updateUsers({ id: req.params.id }, req.body) });
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  const role = await getCurrentUserRole(req);

  try {
    if (!role) {
      throw new Error('Error while getting users');
    }

    if (!isAuthorizedRole(role, ROLE.admin)) {
      const err = new Error('Unauthorized access');

      err.statusCode = httpStatusCodes.UNAUTHORIZED;
      throw err;
    }

    res.json({ success: true, data: await deleteUsers(req.params.id) });
  } catch (err) {
    next(err);
  }
};

module.exports = { readAll, readById, update, del };
