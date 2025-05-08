const Assignment = require('../models/assignment.model');

// Assign employee to project
exports.assignEmployee = async (req, res) => {
  const { employee_id, project_id, project_name } = req.body;
  console.log(req.body);
  

  try {
    const existing = await Assignment.findOne({ employee_id, project_id });
    console.log(existing);
    if (existing) {
      return res.json({ success: false, message: 'Employee already assigned' });
    }

    const assignment = new Assignment({ employee_id, project_id, project_name });
    console.log("Ass",assignment);
    await assignment.save();

    res.json({ success: true, assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all employees assigned to a project
exports.getProjectAssignments = async (req, res) => {
  const { project_id } = req.params;

  try {
    const assignments = await Assignment.find({ project_id });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
