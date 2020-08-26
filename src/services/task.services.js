const httpStatusCodes = require('http-status-codes');

const Task = require('../models/task');
const User = require('../models/user');

const { ROLE } = require('../constants');

const { getCurrentUserId, getCurrentUserRole } = require('../utils/auth.utils');

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
        const err = new Error("Unauthorized access. The Project does'nt belong to current user");

        err.statusCode = httpStatusCodes.UNAUTHORIZED;
        throw err;
      }
    }

    const data = req.body;
    const task = await Task.create(data);

    return task;
  } catch (err) {
    return err;
  }
};

const getTasks = async (req) => {
  try {
    let filter = {};

    const currentUserId = await getCurrentUserId(req);
    const currentUserRole = await getCurrentUserRole(req);

    if (currentUserRole === ROLE.projectManager) {
      // Only show tasks where current user is project manager
      const tasks = await User.forge().getAllTasks(currentUserId);

      return tasks;
    }
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
