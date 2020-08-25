const { createComments, getComments, updateComments, deleteComments } = require('../services/comment.services');
const { SUCCESS_MESSAGE } = require('../constants');

const create = async (req, res, next) => {
  try {
    const result = await createComments(req.body);

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
    const result = await getComments();

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
    const result = await getComments({ id: req.params.id });

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
    const result = await updateComments({ id: req.params.id }, req.body);

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
    const result = await deleteComments(req.params.id);

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.json({ success: true, message: SUCCESS_MESSAGE.delete, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { readAll, create, readById, update, del };
