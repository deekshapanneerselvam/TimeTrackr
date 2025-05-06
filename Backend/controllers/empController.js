// controllers/employeeController.js
const Employee = require('../models/employee');

// Add a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { employee_id , name, email, department} = req.body;

    // Create a new employee object
    const newEmployee = new Employee({
      employee_id,
      name,
      email,
      department

    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Respond with the saved employee details
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();  // Fetch all employees
    res.status(200).json(employees);  // Respond with the list of employees
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};


exports.updateEmployee = async (req, res) => {
  const { id } = req.params; // This should be MongoDB's _id
  const { name, email, department } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, department },
      { new: true }
    );

    if (updatedEmployee) {
      res.json({ message: 'Employee updated', updatedEmployee });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating employee' });
  }
};


// DELETE employee by ID
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Use Mongoose to find and delete the employee by id
    const deletedEmployee = await Employee.findOneAndDelete({ employee_id: id }); 

    if (deletedEmployee) {
      res.json({ message: 'Employee deleted', deletedEmployee });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

