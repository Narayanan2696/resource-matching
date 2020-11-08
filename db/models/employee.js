const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

var options = { discriminatorKey: 'employeeType', timestamps: true };

const employeeSchema = new mongoose.Schema(
  {
    username: {
      type: Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Types.String,
      required: false,
    },
    firstName: {
      type: Types.String,
      required: true,
      default: null,
    },
    lastName: {
      type: Types.String,
      require: true,
      default: null,
    },
    salary: {
      type: Types.Number,
      require: false,
      default: null,
    },
  },
  options
);

module.exports = mongoose.model('Employee', employeeSchema);
