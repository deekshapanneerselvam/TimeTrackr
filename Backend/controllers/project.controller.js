const Project= require('../models/project.model');
const CurrentUser = require('../models/currentUser.model'); 
const Assignment = require('../models/assignment.model');
// controllers/projectController.js

const addProject = async (req, res) => {
  try {
    const { project_id, project_name, client, created_at } = req.body;

    // Check for missing fields
    if (!project_id || !project_name || !client || !created_at) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for existing project ID
    const existingProject = await Project.findOne({ project_id });
    if (existingProject) {
      return res.status(409).json({ error: 'Project ID already exists' });
    }

    // Create new project
    const newProject = new Project({
      project_id,
      project_name,
      client,
      created_at
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getProjects = async (req, res) => {
    try {
      const projects = await Project.find(); // newest first
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  };

  const getProjectById = async (req, res) => {
    try {
      const { projectId } = req.params; 
      

      const project = await Project.findOne({ project_id: projectId });
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  };



const getProjectsForEmployee = async (req, res) => {
    try {
      // 1. Get current logged-in user
      const currentUser = await CurrentUser.findOne(); // Adjust based on how you're tracking sessions
      console.log(currentUser);
      if (!currentUser) {
        return res.status(400).json({ message: 'No current user found' });
      }
  
      const employeeId = currentUser.employee_id;
      
  
      // 2. Get all assignments where employee is assigned
      const assignments = await Assignment.find({ employee_id: employeeId });

  
      if (!assignments.length) {
        return res.status(404).json({ message: 'No project assignments found' });
      }
  
      // 3. Extract all project IDs from the assignments
      const projectIds = assignments.map(assignment => assignment.project_id);
  
      // 4. Fetch full project details for those IDs
      const projects = await Project.find({ project_id: { $in: projectIds } });
  
      if (!projects.length) {
        return res.status(404).json({ message: 'No projects found for assigned IDs' });
      }
  
      res.status(200).json(projects);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching projects' });
    }
  };
  
  // Get employees assigned to a specific project


  

module.exports = {
  addProject,
  getProjects,
  getProjectById,
  getProjectsForEmployee,
  
};
