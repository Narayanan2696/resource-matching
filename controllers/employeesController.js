const ResponseManager = require('../utils/responseManager');
const ErrorConstants = require('../constants/errorConstants');
const EmployeeDAO = require('../db/repository/employeeDao');
const log = require('../utils/loggerUtil');

const employeeCreation = (req, res) => {
  try {
    EmployeeDAO.createEmployee(req.body, req.body.employeeType)
      .then((createdEmployee) => {
        log.infoLogger(createdEmployee);
        ResponseManager.employeeResponse(res, 201, createdEmployee);
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

module.exports = {
  employeeCreation,
};
