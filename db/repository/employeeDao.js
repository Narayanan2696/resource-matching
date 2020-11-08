const Employee = require('../models/employee');
const Manager = require('../models/manager');
const Staff = require('../models/staff');

const _ = require('lodash');

/**
 * Create a new employee of respective type
 * @param {*} newEmployee
 * @param {*} employeeType
 * @returns {Promise} created employee of respective type
 */
const createEmployee = (newEmployee, employeeType) => {
  return new Promise((resolve, reject) => {
    try {
      switch (employeeType) {
        case 'manager':
          const managerObj = new Manager(newEmployee);
          resolve(managerObj.save());
          break;
        case 'staff':
          const staffObj = new Staff(newEmployee);
          resolve(staffObj.save());
          break;
        default:
          const employeeObj = new Employee(newEmployee);
          resolve(employeeObj.save());
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Find an employee of respective type
 * @param {*} queryDetails
 * @param {*} employeeType
 * @returns {Promise} found employee of respective type
 */
const findEmployee = (queryDetails, employeeType) => {
  return new Promise((resolve, reject) => {
    try {
      switch (employeeType) {
        case 'manager':
          resolve(Manager.findOne(queryDetails));
          break;
        case 'staff':
          resolve(Staff.findOne(queryDetails));
          break;
        default:
          resolve(Employee.findOne(queryDetails));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Find all employees of respective type based on query
 * @param {*} queryDetails
 * @param {*} employeeType
 * @returns {Promise} found employees of respective type
 */
const getEmployees = (queryDetails, employeeType) => {
  return new Promise((resolve, reject) => {
    try {
      switch (employeeType) {
        case 'manager':
          resolve(Manager.find(queryDetails));
          break;
        case 'staff':
          resolve(Staff.find(queryDetails));
          break;
        default:
          resolve(Employee.find(queryDetails));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Assign a manager to a project
 * @param {*} projectId
 * @param {*} managerId
 * @returns {Promise} assign a project manager
 */
const assignProject = (projectId, managerId) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        Manager.updateOne(
          { _id: managerId },
          { $push: { projects: { projectId } } },
          { new: true }
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Assign a staff to a project's task
 * @param {*} staffId
 * @param {*} updateDetails
 * @returns {Promise} assign a staff to a task of project
 */
const assignTask = (staffId, updateDetails) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        Staff.updateOne(
          { _id: staffId },
          { $push: { projects: updateDetails } },
          { new: true }
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createEmployee,
  findEmployee,
  getEmployees,
  assignProject,
  assignTask,
};
