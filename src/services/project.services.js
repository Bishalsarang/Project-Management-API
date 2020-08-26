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

module.exports = { getProjects, deleteProjects, createProjects, updateProjects };
