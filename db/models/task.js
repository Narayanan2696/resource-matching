const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: Types.String,
      required: false,
      default: null,
    },
    taskStartTimeStamp: {
      type: Types.Date,
      required: false,
      default: null,
    },
    taskEndTimeStamp: {
      type: Types.Date,
      required: false,
      default: null,
    },
    skills: {
      type: [Types.String],
      required: false,
      default: null,
    },
    projectId: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
