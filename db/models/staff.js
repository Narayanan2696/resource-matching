const mongoose = require('mongoose');
const Employee = require('./employee');

const Types = mongoose.Schema.Types;

var options = { discriminatorKey: 'employeeType', timestamps: true };

const Staff = Employee.discriminator(
  'staff',
  new mongoose.Schema(
    {
      designation: {
        type: Types.String,
        require: false,
        default: null,
      },
      skills: {
        type: [Types.String],
        require: true,
        default: null,
      },
      tasks: {
        type: [Types.String],
        require: true,
        default: null,
      },
      projects: [
        {
          managerId: {
            type: Types.ObjectId,
            ref: 'Manager',
            required: true,
            default: null,
          },
          projectId: {
            type: Types.ObjectId,
            ref: 'Project',
            required: true,
            default: null,
          },
          taskId: {
            type: Types.ObjectId,
            ref: 'Task',
            required: true,
            default: null,
          },
        },
      ],
    },
    options
  )
);

module.exports = Staff;
