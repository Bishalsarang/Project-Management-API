/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const httpStatusCodes = require('http-status-codes');

const Tag = require('../models/tag');
const Task = require('../models/task');
const User = require('../models/user');

const taskSchema = require('../validators/tasks.validators');

const { ROLE } = require('../constants');

const { getCurrentUserId, getCurrentUserRole } = require('../utils/auth.utils');

/**
 * Check if the project is assigned to user by comparing projectId.
 *
 * @param {Object} req
 */
const isAssignedToUser = async (req) => {
  const projectId = parseInt(req.body.project_id);
  const currentUserId = await getCurrentUserId(req);
  //   List all projects belonging to user
  const projectList = await User.forge().getAllProjects(currentUserId);

  return projectList.map((project) => project.id).includes(projectId);
};

const createTasks = async (req) => {
  // Allow task creation if projectId belongs to currentUserID for PM role

  try {
    const currentUserRole = await getCurrentUserRole(req);

    // Project Manager can only create task belonging to him/her
    if (currentUserRole === ROLE.projectManager) {
      const check = await isAssignedToUser(req);

      if (!check) {
        const err = new Error("Unauthorized access. The Project doesn't belong to current user");

        err.statusCode = httpStatusCodes.UNAUTHORIZED;
        throw err;
      }
    }
    const { project_id, title, description, deadline } = req.body;
    const { data, error } = taskSchema.validate({ project_id, title, description, deadline });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const { user_id, ...rest } = req.body;
    const task = await Task.create(rest);

    await Tag.create({ user_id, task_id: task.id, is_assigned: true });

    return task;
  } catch (err) {
    return err;
  }
};

const getTasks = async (req) => {
  try {
    const currentUserId = await getCurrentUserId(req);
    const currentUserRole = await getCurrentUserRole(req);

    if (currentUserRole === ROLE.projectManager) {
      // Only show tasks where current user is project manager
      const tasks = await User.forge().getAllTasks(currentUserId);

      return tasks;
    }
    let filter = {};

    //  Get by params id
    if (req.params.id) {
      filter = { id: req.params.id };
    }
    const tasks = await Task.findAll(filter);

    return tasks;
  } catch (err) {
    return err;
  }
};

const updateTasks = async (req) => {
  // , req.body
  try {
    const taskId = req.params.id;
    const { project_id, title, description, deadline, ...rest } = req.body;
    const { data, error } = taskSchema.validate({ project_id, title, description, deadline });

    if (error) {
      throw new Error(error.details[0].message);
    }
    const filter = { id: taskId };

    const task = await Task.update(filter, req.body);

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

const getTaggedUsers = async (id) => {
  try {
    const users = await Task.forge().getAllTags(id);

    return users;
  } catch (err) {
    return err;
  }
};

module.exports = { createTasks, getTaggedUsers, getTasks, updateTasks, deleteTasks };
