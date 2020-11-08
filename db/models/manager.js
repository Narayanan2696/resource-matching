const mongoose = require('mongoose');
const Employee = require('./employee');

const Types = mongoose.Schema.Types;

var options = { discriminatorKey: 'employeeType', timestamps: true };

const Manager = Employee.discriminator(
  'manager',
  new mongoose.Schema(
    {
      designation: {
        type: Types.String,
        require: false,
        default: null,
      },
      projects: [
        {
          projectId: {
            type: Types.ObjectId,
            ref: 'Project',
            required: true,
            default: null,
          },
        },
      ],
    },
    options
  )
);

module.exports = Manager;
