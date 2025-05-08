const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    employee_id: {
        type: String, // Reference to Employee model
        required: true, // employee_id is required
    },
    employee_name:
    {
        type:String,
        required:true,
    },
  project_id: {
    type: String, // or mongoose.Schema.Types.ObjectId if referencing a Project collection
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  start_time: {
    type: String, // e.g., "09:00"
    required: true,
  },
  end_time: {
    type: String, // e.g., "17:00"
    required: true,
  },
  duration: {
    type: String, // Duration in hours or minutes (choose one and stay consistent)
    required: true,
  },
  status:{
    type: String,
    enum: ['Submitted', 'Approved', 'Rejected'],
    default: "Submitted",
    required:true,
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
