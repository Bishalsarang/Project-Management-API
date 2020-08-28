const { createTasks, getTasks, updateTasks, deleteTasks, getTaggedUsers } = require('../services/task.services');

const { SUCCESS_MESSAGE } = require('../constants');

const create = async (req, res, next) => {
  try {
    const result = await createTasks(req);

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
    const result = await getTasks(req);

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
    const result = await getTasks(req);

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.read, data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTasks(req);

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
    const result = await deleteTasks(req.params.id);

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.delete, data: result });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await getTaggedUsers(req.params.id);

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.write, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { readAll, create, readById, update, del, getUsers };
