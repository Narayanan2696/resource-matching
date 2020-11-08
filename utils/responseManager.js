const _ = require('lodash');

const errorResponse = (res, code, type, message) => {
  res.status(code).json({
    status: 'error',
    error_type: type,
    message: message,
  });
};

const customResponse = (res, code, message) => {
  res.status(code).json({
    status: 'success',
    message: message,
  });
};

const employeeResponse = (res, code, object) => {
  if (!_.isEmpty(object) && _.isArray(object)) {
    object = _.map(object, (obj) => {
      obj = _.omit(obj, ['__v']);

      return obj;
    });
    res.status(code).json({
      employees: object,
    });
  } else if (_.isEmpty(object) && _.isArray(object)) {
    res.status(code).json({
      employees: object,
    });
  } else {
    object = _.omit(object._doc, ['__v']);
    res.status(code).json({
      employee: object,
    });
  }
};

const projectResponse = (res, code, object) => {
  if (!_.isEmpty(object) && _.isArray(object)) {
    object = _.map(object, (obj) => {
      obj = _.omit(obj, ['__v']);

      return obj;
    });
    res.status(code).json({
      projects: object,
    });
  } else if (_.isEmpty(object) && _.isArray(object)) {
    res.status(code).json({
      projects: object,
    });
  } else {
    object = _.omit(object._doc, ['__v']);
    res.status(code).json({
      project: object,
    });
  }
};

const taskResponse = (res, code, object) => {
  if (!_.isEmpty(object) && _.isArray(object)) {
    object = _.map(object, (obj) => {
      obj = _.omit(obj, ['__v']);

      return obj;
    });
    res.status(code).json({
      tasks: object,
    });
  } else if (_.isEmpty(object) && _.isArray(object)) {
    res.status(code).json({
      tasks: object,
    });
  } else {
    object = _.omit(object._doc, ['__v']);
    res.status(code).json({
      task: object,
    });
  }
};

module.exports = {
  errorResponse,
  customResponse,
  employeeResponse,
  projectResponse,
  taskResponse,
};
