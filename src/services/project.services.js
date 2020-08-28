const Member = require('../models/member');
const Project = require('../models/project');

/**
 * Create a new project on database.
 *
 * @param {Object} data
 */
const createProjects = async (data) => {
  // This function creates new record on projects and members table
  // Because eery project should have a member (Project Manager)
  try {
    const project = await Project.create({ title: data.title, description: data.description });

    try {
      // If project created successfully then add manager
      await Member.create({ user_id: data.user_id, project_id: project.id, is_manager: true });

      return { ...project, manager_user_id: data.user_id };
    } catch (err) {
      //  Rollback
      await deleteProjects(project.id);

      return err;
    }
  } catch (err) {
    return err;
  }
};

const getProjects = async (filter) => {
  try {
    const projects = await Project.findAll(filter);

    const ids = projects.map((project) => project.id);
    const managers = ids.map((id) => {
      Project.forge()
        .getManager(id)
        .then((data) => (data[0] ? data[0].user_id : null));
    });

    console.log(managers);

    return projects;
  } catch (err) {
    return err;
  }
};

const updateProjects = async (filter, updateData) => {
  try {
    const projects = await Project.update(filter, {
      title: updateData.title,
      description: updateData.description
    });

    try {
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
  console.log(req.params, req.body);
  try {
    const user = await Member.create({ project_id: req.params.id, user_id: req.body.user_id });

    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { getProjects, deleteProjects, createProjects, getAllUsers, updateProjects, getAllTasks, addUser };
