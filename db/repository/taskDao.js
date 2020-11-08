const Task = require('../models/task');

/**
 * Create a new task for a project
 * @param {*} newTask
 * @returns {Promise}
 */
const createTask = (newTask) => {
  return new Promise((resolve, reject) => {
    try {
      const taskObj = new Task(newTask);
      resolve(taskObj.save());
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Find a task
 * @param {*} queryDetails
 * @returns {Promise}
 */
const findTask = (queryDetails) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(Task.findOne(queryDetails));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createTask,
  findTask,
};
