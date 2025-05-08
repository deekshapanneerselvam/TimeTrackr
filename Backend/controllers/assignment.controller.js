const Assignment = require('../models/assignment.model');
const Project=require('../models/project.model');

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


exports.getEmployeeProjects = async (req, res) => {
  

  try {
    // Fetch projects assigned to the employee based on their employee_id
    const projects = await Project.find({ employee_id: employee_id });

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects assigned to this employee' });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};
