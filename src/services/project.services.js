/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const Member = require('../models/member');
const Project = require('../models/project');
const User = require('../models/user');

const projectSchema = require('../validators/projects.validators');

/**
 * Create a new project on database.
 *
 * @param {Object} data
 */
const createProjects = async ({ title, description, user_id }) => {
  // This function creates new record on projects and members table
  // Because eery project should have a member (Project Manager)
  try {
    const { data, error } = projectSchema.validate({ title, description });

    if (error) {
      throw new Error(error.details[0].message);
    }
    const project = await Project.create({ title, description });

    try {
      // If project created successfully then add manager
      // eslint-disable-next-line camelcase
      await Member.create({ user_id: user_id, project_id: project.id, is_manager: true });

      // eslint-disable-next-line camelcase
      return { ...project, manager_user_id: user_id };
    } catch (err) {
      //  Rollback
      await deleteProjects(project.id);

      return err;
    }
  } catch (err) {
    return err;
  }
};

/**
 * Admin and PM can view all the projects but other user can view only the projects they are associated.
 */
const getProjects = async ({ id, userId }) => {
  try {
    if (userId) {
      const projects = await User.forge().getAllProjects(userId);

      return projects;
    } else {
      if (id) {
        const projects = await Project.findAll({ id });

        return projects;
      }
      const projects = await Project.findAll();

      return projects;
    }
  } catch (err) {
    return err;
  }
};

const updateProjects = async (filter, updateData) => {
  try {
    const { data, error } = projectSchema.validate({ title: updateData.title, description: updateData.description });

    if (error) {
      throw new Error(error.details[0].message);
    }
    const projects = await Project.update(filter, {
      title: updateData.title,
      description: updateData.description
    });

    try {
      // eslint-disable-next-line camelcase
      await Member.update({ project_id: projects.id }, { user_id: updateData.user_id });
    } catch (err) {
      return err;
    }

    return projects;
  } catch (err) {
    return err;
  }
};

const deleteProjects = async (userId) => {
  try {
    const deleted = await Project.destroy({ id: userId });

    return deleted;
  } catch (err) {
    return err;
  }
};

const getAllTasks = async (projectId) => {
  try {
    const tasks = await Project.forge().getAllTasks(projectId);

    return tasks;
  } catch (err) {
    return err;
  }
};

const getAllUsers = async (projectId) => {
  try {
    const users = await Project.forge().getAllUsers(projectId);
    const { password, ...rest } = users;

    return users.map(({ password, _pivot_project_id, ...rest }) => rest);
  } catch (err) {
    return err;
  }
};

const addUser = async (req) => {
  try {
    const user = await Member.create({ project_id: req.params.id, user_id: req.body.user_id });

    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { getProjects, deleteProjects, createProjects, getAllUsers, updateProjects, getAllTasks, addUser };
