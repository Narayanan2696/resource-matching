const ResponseManager = require('../utils/responseManager');
const ErrorConstants = require('../constants/errorConstants');
const ProjectDAO = require('../db/repository/projectDao');
const EmployeeDAO = require('../db/repository/employeeDao');
const ProjectAssignmentUtil = require('../utils/projectAssigmentUtil');
const log = require('../utils/loggerUtil');

const projectCreation = (req, res) => {
  try {
    ProjectDAO.createProject(req.body)
      .then((createdProject) => {
        log.infoLogger(createdProject);
        ResponseManager.projectResponse(res, 201, createdProject);
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

const assignProjectManager = async (req, res) => {
  try {
    let canAssign = await ProjectAssignmentUtil.canAssignManager(
      req.params.projectId,
      req.body.managerId
    );
    if (canAssign) {
      EmployeeDAO.assignProject(req.params.projectId, req.body.managerId)
        .then((assignedProject) => {
          log.infoLogger(
            `Assigned project id: ${assignedProject._id} to manager id: ${req.body.managerId}`
          );
          ResponseManager.customResponse(
            res,
            200,
            `Assigned project id: ${assignedProject._id} to manager id: ${req.body.managerId}`
          );
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
        `manager id: ${req.body.managerId} is already assigned to a project!!`
      );
      ResponseManager.errorResponse(
        res,
        400,
        ErrorConstants.FAILED,
        `manager id: ${req.body.managerId} is already assigned to a project!!`
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
  projectCreation,
  assignProjectManager,
};
