const httpStatusCodes = require('http-status-codes');

const Task = require('../models/task');
const User = require('../models/user');
const Project = require('../models/project');

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
    const updateData = req.body;
    const filter = { id: taskId };
    const currentUserId = await getCurrentUserId(req);
    const currentUserRole = await getCurrentUserRole(req);

    //
    //  PM can only update tasks belonging to his project
    if (currentUserRole === ROLE.projectManager) {
      //  getAllProjectsAssociated with PM
      const projectList = await User.forge().getAllProjects(currentUserId);
      // Get all tasks associated with project

      const projectIds = projectList.map((project) => project.id);
    }
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
