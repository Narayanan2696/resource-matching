const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: Types.String,
      required: true,
      unique: true,
    },
    startTimeStamp: {
      type: Types.Date,
      required: false,
      default: null,
    },
    endTimeStamp: {
      type: Types.Date,
      required: false,
      default: null,
    },
    budjet: {
      type: Types.String,
      require: false,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
