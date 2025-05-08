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
    role: {
      type: String,
      enum: ['Admin', 'Employee', 'Manager'],
      default: 'Employee',
      required: true
    }
    
  },
  {
    timestamps: true, 
  }
);

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
