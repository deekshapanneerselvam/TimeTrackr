const mongoose = require('mongoose');
const { Schema } = mongoose;

// CurrentUser schema for keeping track of the current user (optional)
const currentUserSchema = new Schema(
  {
    employee_id: {
      type: String,
      required: true,
      unique: true, // To ensure we track only one logged-in user
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
      required: true,
    }
    
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create CurrentUser model
const CurrentUser = mongoose.model('CurrentUser', currentUserSchema);

module.exports = CurrentUser;
