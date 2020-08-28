const Comment = require('../models/comment');

const createComments = async (data) => {
  try {
    const task = await Comment.create(data);

    return task;
  } catch (err) {
    return err;
  }
};

const getComments = async (filter) => {
  try {
    const tasks = await Comment.findAll(filter);

    return tasks;
  } catch (err) {
    return err;
  }
};

const updateComments = async (filter, updateData) => {
  try {
    const task = await Comment.update(filter, updateData);

    return task;
  } catch (err) {
    return err;
  }
};

const deleteComments = async (userId) => {
  try {
    const task = await Comment.destroy({ id: userId });

    return task;
  } catch (err) {
    return err;
  }
};

module.exports = { deleteComments, updateComments, getComments, createComments };
