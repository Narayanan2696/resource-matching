const Project = require('../models/project');

/**
 * Create a new project
 * @param {*} newProject
 * @returns {Promise}
 */
const createProject = (newProject) => {
  return new Promise((resolve, reject) => {
    try {
      const projectObj = new Project(newProject);
      resolve(projectObj.save());
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * find project by id
 * @param {*} projectId
 * @returns {Promise}
 */
const findProjectbyId = (projectId) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(Project.findById(projectId));
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createProject,
  findProjectbyId,
};
