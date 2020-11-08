const _ = require('lodash');
const EmployeeDAO = require('../db/repository/employeeDao');
const ProjectDAO = require('../db/repository/projectDao');
const TaskDAO = require('../db/repository/taskDao');

/**
 * Algorithm to verify if the given manager can be assigned for the project
 * @param {*} projectId
 * @param {*} managerId
 */
const canAssignManager = (projectId, managerId) => {
  return new Promise((resolve, reject) => {
    EmployeeDAO.findEmployee({ _id: managerId }, 'manager').then(
      async (foundManager) => {
        if (foundManager && foundManager.employeeType == 'manager') {
          let projects = foundManager.projects;
          let foundProject = _.find(
            projects,
            (project) => project.projectId.toString() == projectId.toString()
          );
          if (foundProject) {
            let project = await ProjectDAO.findProjectbyId(projectId);
            if (project && project.endTimeStamp < new Date()) resolve(true);
            else resolve(false);
          } else resolve(true);
        } else {
          reject(new Error(`Given employee id: ${managerId} is not a manager`));
        }
      }
    );
    try {
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Resource allocator algorithm
 * allocates right staff for the task based on the skill, availability and task relevance
 * @param {*} staffs
 * @param {*} task
 * @returns {Promise} assigned staff for the task
 */
const taskAssigner = (staffs, task) => {
  return new Promise(async (resolve, reject) => {
    try {
      let manager = await EmployeeDAO.findEmployee(
        {
          'projects.projectId': task.projectId,
        },
        'manager'
      );
      // priority of project assignment is based on the seniority level
      let seniorityStaffs = _.orderBy(staffs, ['createdAt'], ['asc']);
      var assigned = false;
      for (let staff of seniorityStaffs) {
        if (staff.projects.length < 1) {
          let updateDetails = {
            managerId: manager._id,
            projectId: task.projectId,
            taskId: task._id,
          };
          assigned = true;
          await EmployeeDAO.assignTask(staff._id, updateDetails);
          resolve(EmployeeDAO.findEmployee({ _id: staff._id }, 'staff'));
        } else {
          let latestProject = staff.projects[staff.projects.length - 1];
          if (latestProject.taskId != task._id) {
            let latestTask = await TaskDAO.findTask({
              _id: latestProject.taskId,
            });
            if (latestTask.taskEndTimeStamp > new Date()) {
              assigned = true;
              await EmployeeDAO.assignTask(staff._id, updateDetails);
              resolve(EmployeeDAO.findEmployee({ _id: staff._id }, 'staff'));
            }
          }
        }
      }
      if (!assigned)
        reject(
          new Error(
            `No staffs are available at the moment for assigning to this task`
          )
        );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  canAssignManager,
  taskAssigner,
};
