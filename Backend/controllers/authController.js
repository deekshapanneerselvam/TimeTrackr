const Employee = require('../models/employee.model'); // Update path as needed
const CurrentUser = require('../models/currentUser.model');
// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, employee_id, role } = req.body;

  if (!email || !employee_id || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await Employee.findOne({
      email: email.trim().toLowerCase(),
      employee_id: employee_id.trim(),
      role: role.trim()
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials. Please check your email, ID, and role.' });
    }

    const currentUser = await CurrentUser.findOneAndUpdate(
      {}, // Empty filter to target the single document
      {
        employee_id: user.employee_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      { upsert: true, new: true } // Ensure the document is created if it doesn't exist, and return the updated document
    );

    return res.status(200).json({
      message: 'Login successful',
      user: {
        employee_id: user.employee_id,
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};
