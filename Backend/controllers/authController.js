// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
  const { email, password, role } = req.body;

  try {
    // 1. Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // 2. Check if role matches
    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(400).json({ message: `Role mismatch. You are registered as ${user.role}` });
    }

    // 3. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // 4. Login successful
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
