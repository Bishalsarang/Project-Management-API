const Project = require('../models/project');

const createProjects = async (data) => {
  try {
    const project = await Project.create(data);

    return project;
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
    const projects = await Project.update(filter, updateData);

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
