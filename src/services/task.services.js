const Task = require('../models/task');

const createTasks = async (data) => {
  try {
    const task = await Task.create(data);

    return task;
  } catch (err) {
    return err;
  }
};

const getTasks = async (filter) => {
  try {
    const tasks = await Task.findAll(filter);

    return tasks;
  } catch (err) {
    return err;
  }
};

const updateTasks = async (filter, updateData) => {
  try {
    const task = await Task.update(filter, updateData);

    return task;
  } catch (err) {
    return err;
  }
};

const deleteTasks = async (userId) => {
  try {
    const task = await Task.destroy({ id: userId });

    return task;
  } catch (err) {
    return err;
  }
};

module.exports = { createTasks, getTasks, updateTasks, deleteTasks };
