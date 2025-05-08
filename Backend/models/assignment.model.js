const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignmentSchema = new Schema(
  {
    employee_id: {
      type: String,
      required: true,
      ref: 'Employee'
    },
    project_id: {
      type: String,
      required: true,
      ref: 'Project'
    },
    project_name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
