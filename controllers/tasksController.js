const ResponseManager = require('../utils/responseManager');
const ErrorConstants = require('../constants/errorConstants');
const ProjectDAO = require('../db/repository/projectDao');
const EmployeeDAO = require('../db/repository/employeeDao');
const TaskDAO = require('../db/repository/taskDao');
const ProjectAssignmentUtil = require('../utils/projectAssigmentUtil');
const log = require('../utils/loggerUtil');

const taskCreation = async (req, res) => {
  try {
    let newTask = {
      projectId: req.params.projectId,
      taskName: req.body.task,
      skills: req.body.skills,
      taskStartTimeStamp: req.body.startTimeStamp,
      taskEndTimeStamp: req.body.endTimeStamp,
    };
    // validation to be handled for task date range is it between the project timeline
    TaskDAO.createTask(newTask)
      .then((createdTask) => {
        log.infoLogger(createdTask);
        ResponseManager.taskResponse(res, 201, createdTask);
      })
      .catch((err) => {
        log.errorLogger(err.message);
        ResponseManager.errorResponse(
          res,
          400,
          ErrorConstants.VALIDATION_ERROR,
          err.message
        );
      });
  } catch (error) {
    log.errorLogger(error.message);
    ResponseManager.errorResponse(
      res,
      500,
      ErrorConstants.SOMETHING_WENT_WRONG,
      error.message
    );
  }
};

const assignStaffToTask = async (req, res) => {
  try {
    let task = await TaskDAO.findTask({
      _id: req.params.taskId,
      projectId: req.params.projectId,
    });
    if (task) {
      let queryDetails = {
        skills: { $in: task.skills },
        tasks: task.taskName,
        'projects.projectId': { $ne: req.params.projectId },
        'projects.taskId': { $ne: req.params.taskId },
      };
      EmployeeDAO.getEmployees(queryDetails, 'staff')
        .then((filteredEmployees) => {
          ProjectAssignmentUtil.taskAssigner(filteredEmployees, task)
            .then((assignedStaff) => {
              ResponseManager.employeeResponse(res, 200, assignedStaff);
            })
            .catch((err) => {
              log.errorLogger(err.message);
              ResponseManager.errorResponse(
                res,
                400,
                ErrorConstants.FAILED,
                err.message
              );
            });
        })
        .catch((err) => {
          log.errorLogger(err.message);
          ResponseManager.errorResponse(
            res,
            400,
            ErrorConstants.FAILED,
            err.message
          );
        });
    } else {
      log.errorLogger(
        `Given task Id: ${req.params.taskId} for the project Id: ${req.params.projectId} is not found!!`
      );
      ResponseManager.errorResponse(
        res,
        400,
        ErrorConstants.NOT_FOUND,
        `Given task Id: ${req.params.taskId} for the project Id: ${req.params.projectId} is not found!!`
      );
    }
  } catch (error) {
    log.errorLogger(error.message);
    ResponseManager.errorResponse(
      res,
      400,
      ErrorConstants.FAILED,
      error.message
    );
  }
};

module.exports = {
  taskCreation,
  assignStaffToTask,
};
