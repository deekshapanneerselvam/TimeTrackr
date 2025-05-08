// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/employee.model');

// Register user
exports.signup = async (req, res) => {
  const { fullName, email, password, role } = req.body;  // Updated to use fullName

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      fullName,  // Use fullName here
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, employee_id, role } = req.body;
  console.log(req.body);

  try {
    // 1. Find employee by email
    const employee = await User.findOne({ email });
    console.log(employee);


    if (!employee) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // 2. Match employee_id
    if (employee.employee_id !== employee_id) {
      return res.status(400).json({ message: 'Incorrect Employee ID' });
    }

    // 3. Match role
    if (employee.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(400).json({ message: `Role mismatch. You are registered as ${employee.role}` });
    }

    // 4. Login success
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        employee_id: employee.employee_id,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
