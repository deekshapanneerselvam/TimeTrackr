const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    employee_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,  
    },
    department: {
      type: String,
      required: true, 
    },

    assignedProjects: [
      {
        projectId: {
          type: String,
          ref: 'Project', // Reference to the Project model
          required: true,
        },
        projectName: {
          type: String,
          required: true,
        },
      },
    ],
    
    
  },
  {
    timestamps: true, 
  }
);

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
